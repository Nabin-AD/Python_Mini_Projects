import imageio.v3 as iio
from PIL import Image
import numpy as np
from tkinter import Tk, filedialog  #Python built library for graphical interface like popups, buttons
#tk for the window and filedialog for the file selection dialog

#Program only works if the image have same shape for now
#Same function as the static one with the only change in image selection


# Start tkinter's engine (needed before any popup can work) 
#Connects to the operating system's GUI system
root = Tk()
root.withdraw()
#By default, Tk() would show an actual empty, blank application window on your screen — 
#since we don't want that. .withdraw() hides that blank window from view, while keeping it running in the background.

# Open a native "choose files" dialog — user can select any number of images
imagenames = filedialog.askopenfilenames(
    title="Select images for GIF",
    filetypes=[("Image files", "*.png *.jpg *.jpeg")]
)

images = []


#Same as the static one(Read that to understand below code section) 
for filename in imagenames:
    img = Image.open(filename).convert('RGB')
    images.append(np.array(img))

iio.imwrite('IMAGE.gif', images, duration=500, loop=0)

#Print the number of frames used to create the gif upon success
print(f"GIF saved with {len(images)} frames.")   