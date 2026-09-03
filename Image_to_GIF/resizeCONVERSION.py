import imageio.v3 as iio
from PIL import Image
import numpy as np
from tkinter import Tk, filedialog

# Tkinter needs a running window instance before any popup (like the file picker below) can work
root = Tk()
root.withdraw()   # We don't want to see this window, just use it in the background

# Open a "choose files" popup and store what the user picks
imagenames = filedialog.askopenfilenames(
    title="Select images for GIF",
    filetypes=[("Image files", "*.png *.jpg *.jpeg")]
)

# Background color used to fill the extra space around smaller frames.
# Change this to match your game/sprite background (e.g. transparent games often use white or black).
BACKGROUND_COLOR = (255, 255, 255)

# Open every selected image first, keeping alpha (RGBA) so transparency is preserved when pasting
opened_images = [Image.open(f).convert('RGBA') for f in imagenames]

# Find the biggest width and biggest height across ALL frames —
# every frame will be padded up to this shared size, never shrunk or stretched
max_width = max(img.width for img in opened_images)
max_height = max(img.height for img in opened_images)

images = []
for img in opened_images:
    # Create a blank canvas at the largest size found
    canvas = Image.new('RGB', (max_width, max_height), BACKGROUND_COLOR)

    # Center the frame horizontally, but align it to the BOTTOM —
    # good for standing sprites, so feet stay on the same "ground line" across frames
    x = (max_width - img.width) // 2
    y = max_height - img.height

    # Paste the original image at full resolution — img itself is used as the mask,
    # so any transparent pixels in the source blend into BACKGROUND_COLOR instead of showing black
    canvas.paste(img, (x, y), img)

    images.append(np.array(canvas))

iio.imwrite('IMAGE.gif', images, duration=400, loop=0)

print(f"GIF saved with {len(images)} frames.")