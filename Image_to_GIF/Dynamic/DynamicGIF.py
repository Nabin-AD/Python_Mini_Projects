import imageio.v3 as iio
from PIL import Image
import numpy as np
from tkinter import Tk, filedialog

# Hide the blank tkinter window that would otherwise pop up
root = Tk()
root.withdraw()

# Open a native "choose files" dialog — user can select any number of images
imagenames = filedialog.askopenfilenames(
    title="Select images for GIF",
    filetypes=[("Image files", "*.png *.jpg *.jpeg")]
)

images = []

for filename in imagenames:
    img = Image.open(filename).convert('RGB')
    images.append(np.array(img))

iio.imwrite('IMAGE.gif', images, duration=500, loop=0)

print(f"GIF saved with {len(images)} frames.")