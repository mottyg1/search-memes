import os
import pandas as pd
import tesserocr
from PIL import Image


def grayscale(image):
    """Converts the image to grayscale."""
    return image.convert('L')


def threshold(image, threshold=127):
    """Applies a thresholding filter to the image."""
    return image.point(lambda x: 0 if x < threshold else 255)


def crop_image(image, crop_percentage_height=0.3, crop_percentage_width=0.1):
    width, height = image.size
    crop_height = int(height * crop_percentage_height)
    crop_width = int(width * crop_percentage_width)
    # Crop the image to the lower part
    return image.crop((crop_width, height - crop_height, width - crop_width, height))


def preprocess_image(image):
    image = crop_image(image)

    image = threshold(image, 210)

    image = grayscale(image)

    return image


def detect_hebrew_subtitles(image, api):
    api.SetVariable("tessedit_char_whitelist", 'אבגדהוזחטיכלמנסעפצקרשתץףךןם !-?.0123456789"')

    api.SetImage(image)

    text = api.GetUTF8Text()

    return text.strip()


directory = 'D:\\memes\\'
api = tesserocr.PyTessBaseAPI(path=r".\tessdata-main", lang="heb", psm=tesserocr.PSM.SINGLE_BLOCK)

data = []
i = 0
for root, dirs, files in os.walk(directory):

    for file in files:
        i += 1
        if i % 20 == 0:
            print(i)
        image = Image.open(os.path.join(root, file))
        image = preprocess_image(image)
        text = detect_hebrew_subtitles(image, api)
        d = root.replace('D:\\', '').replace('\\', '/')
        data.append({
            'image_url': f'{d}/{file}',
            'text': text,
            'series': d.replace('memes/', '').split('/')
        })


df = pd.DataFrame(data)
df.to_json('memes.json', orient='records')