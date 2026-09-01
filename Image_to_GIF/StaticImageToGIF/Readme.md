# Static Image to GIF

The original, simplest version of the converter. Images are combined into a GIF using a fixed, hand-typed list of file paths.

## Files

```
StaticImageToGIF/
├── IMAGEtoGIF.py     # Main script
├── Bear.gif          # Output — generated after running the script
└── Readme.md         # This file
```

Uses the sample images from [`../Images/Bear/`](../Images/Bear).

## Input Images

| F1.png | F2.jpg | F3.jpg | F4.jpg |
|---|---|---|---|
| ![F1](../Images/Bear/F1.png) | ![F2](../Images/Bear/F2.jpg) | ![F3](../Images/Bear/F3.jpg) | ![F4](../Images/Bear/F4.jpg) |

## Output

![Bear GIF](Bear.gif)

`Bear.gif` — all four frames combined, each displayed for 350ms, looping forever. This is a fixed example set for this version — the list of images used is hardcoded in the script.

## Libraries Used

| Library | Role |
|---|---|
| **imageio** | Saves the final list of frames as a GIF file. |
| **Pillow** | Opens each image file and standardizes its color format (RGB), fixing mismatches between file types (e.g. PNG with transparency vs. JPG without). |
| **NumPy** | Converts Pillow's image objects into raw pixel arrays, the format imageio expects for writing. |

## Limitations

- The list of image files is **hardcoded** — adding, removing, or swapping images requires editing the code directly.
- Standardizes color format (RGB) but does **not** resize images. Only works because the sample images already share the same width and height. If dimensions differed, resizing would need to be added.
- See the [Dynamic version](../Dynamic/Readme.md) for a version that removes the hardcoded list limitation.