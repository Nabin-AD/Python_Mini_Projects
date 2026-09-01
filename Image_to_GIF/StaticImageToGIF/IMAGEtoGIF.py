import imageio.v3 as iio
from PIL import Image
import numpy as np

#Use this code if images have different channels like [(768, 1408, 4)   ← F1.png ,(768, 1408, 3)   ← F2.jpg {Height, Width, Channels}]
#If images are of same use the code below to create GIF

#The first list is simply the location names of where each image is located,
#The second list is empty and will be used to store the images after they are loaded in and converted to numpy arrays. 
imagenames = ['Images/Bear/F1.png', 'Images/Bear/F2.jpg', 'Images/Bear/F3.jpg', 'Images/Bear/F4.jpg']
images = []



#filename is temporary place holder that holder the location of the image that is looping
#imagenames is the list of image locations, and the for loop will loop through each image location and load the image into memory
#Image.open(filename) → open that picture file
#.convert('RGB') → make sure it's in a standard color format
#np.array(img) → turn it into a form that our GIF-saving tool can understand
#images.append(...) → drop it into our basket (images)
for filename in imagenames:
    img = Image.open(filename).convert('RGB')   # force 3-channel RGB, drops alpha
    images.append(np.array(img))


#Simply used to verify that all images are the same shape, otherwise the GIF will not be created
for img in images:
    print(img.shape)


#Take the whole list 'images' and
#Save it as a file called Bear.gif while showing each picture for 500 milliseconds before switching to the next
#Loop forever (loop=0 means "never stop repeating")
iio.imwrite('Bear.gif', images, duration=350, loop=0)





#Alternative
"""
import imageio.v3 as iio

imagenames = ['Images/name.jpg', 'Images/name.jpg']
images = [ ]

for filename in imagenames:
  images.append(iio.imread(filename))

iio.imwrite('Bear.gif', images, duration=500, loop=0)
"""