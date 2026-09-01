# Dynamic Image to GIF

An improved version of the converter that removes the hardcoded image list. Instead of typing filenames into the code, a native file picker lets you select any number of images, from anywhere on your computer, each time you run the script.

## Files

```
Dynamic/
├── DynamicGIF.py     # Main script
├── IMAGE.gif          # Output — generated after running the script
└── Readme.md          # This file
```

Can be tested with either sample set in [`../Images/`](../Images) (`Bear/` or `Rabbit/`), or any other images on your computer.

## Example Input Images

This example run used the `Rabbit/` sample set — since the file picker lets you choose any images, this is just one possible input, not a fixed requirement.

| R1.png | R2.jpg | R3.jpg |
|---|---|---|
| ![R1](../Images/Rabbit/R1.png) | ![R2](../Images/Rabbit/R2.jpg) | ![R3](../Images/Rabbit/R3.jpg) |

## Output

![Dynamic GIF](IMAGE.gif)

`IMAGE.gif` — all selected frames combined, each displayed for 500ms, looping forever.

## Libraries Used

| Library | Role |
|---|---|
| **imageio** | Saves the final list of frames as a GIF file. |
| **Pillow** | Opens each selected image and standardizes its color format (RGB). |
| **NumPy** | Converts Pillow's image objects into raw pixel arrays, the format imageio expects for writing. |
| **tkinter** | Opens the native file picker popup used to select images. Built into Python — not installed via pip. |

## How This Differs From the Static Version

| | Static | Dynamic |
|---|---|---|
| **Image selection** | Fixed list written directly in the code | Live file picker popup, run each time the script executes |
| **Adding/removing images** | Requires editing the code | Just select different files in the popup — no code changes |
| **Image source** | Must live inside the project's `Images/` folder, matching the list | Can be selected from anywhere on the computer |

See the [Static version](../StaticImageToGIF/Readme.md) for the simpler, original approach this was built on top of.

## Limitations

- Still standardizes color format (RGB) but does **not** resize images — mixing images of different dimensions will still cause an error.
- Output filename (`IMAGE.gif`) and animation settings (frame duration, looping) are currently fixed in the code, not selectable through the picker.