import os
from PIL import Image, ImageEnhance
import numpy as np

src_path = r'C:/Users/ashif/.gemini/antigravity/brain/dc8b9b32-cc5c-4baa-b1a6-cd70ca7e88be/.user_uploaded/media_1791898699610_eccde87e.png'
out_dir = r'c:\Users\ashif\OneDrive\Desktop\CHIC COUTURE\public'
os.makedirs(out_dir, exist_ok=True)

# 1. Save original copy
img = Image.open(src_path).convert("RGBA")
img.save(os.path.join(out_dir, "logo-original.png"), "PNG")

arr = np.array(img).astype(np.float32)
# The image has off-white background around ~250-255
# Calculate distance from white/off-white (252, 252, 252)
r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

# Create transparent version
# Background is very light: r > 240, g > 238, b > 235
# Smooth alpha transition:
# Brightness:
brightness = (r + g + b) / 3.0
# Alpha mask:
# If brightness > 248 -> 0
# If brightness < 230 -> 255
# In between -> linear interpolation
alpha = np.clip((248.0 - brightness) / (248.0 - 230.0) * 255.0, 0, 255)
# But preserve gold colors even if lighter
# Gold color has high red/green and lower blue (r > 180, g > 140, b < 120 or r - b > 40)
gold_mask = (r - b > 25) & (r > 140)
# For gold pixels, keep alpha higher
alpha = np.where(gold_mask & (alpha < 180), np.maximum(alpha, (252.0 - b) * 2.5), alpha)
alpha = np.clip(alpha, 0, 255).astype(np.uint8)

transparent_arr = arr.copy().astype(np.uint8)
transparent_arr[:, :, 3] = alpha
transparent_img = Image.fromarray(transparent_arr, "RGBA")

# Crop to non-empty bounds with slight padding
bbox = transparent_img.getbbox()
print("Transparent bbox:", bbox)
cropped_transparent = transparent_img.crop((bbox[0] - 15, bbox[1] - 15, bbox[2] + 15, bbox[3] + 15))
cropped_transparent.save(os.path.join(out_dir, "logo-transparent.png"), "PNG")

# Also save standard logo.png as cropped transparent
cropped_transparent.save(os.path.join(out_dir, "logo.png"), "PNG")

# 2. Dark mode variant:
# On dark background (#111111 or #1a1918), black lines will disappear.
# We transform black / dark grey pixels (where r < 70, g < 70, b < 70) into warm ivory (#F8F5EF).
# Gold pixels stay gold!
dark_mode_arr = np.array(cropped_transparent).astype(np.float32)
dr, dg, db, da = dark_mode_arr[:, :, 0], dark_mode_arr[:, :, 1], dark_mode_arr[:, :, 2], dark_mode_arr[:, :, 3]

# Pixels that are dark (low brightness and low saturation/not gold):
is_black = (dr < 85) & (dg < 85) & (db < 85) & (da > 30)
# Soft blend for anti-aliasing edges of black:
black_factor = np.clip((85.0 - np.maximum(dr, np.maximum(dg, db))) / 85.0, 0, 1.0)
# Make black become ivory: (248, 245, 239)
ivory_r, ivory_g, ivory_b = 248.0, 245.0, 239.0

new_r = np.where(is_black, ivory_r, dr)
new_g = np.where(is_black, ivory_g, dg)
new_b = np.where(is_black, ivory_b, db)

dark_mode_img = Image.fromarray(np.stack([new_r, new_g, new_b, da], axis=-1).astype(np.uint8), "RGBA")
dark_mode_img.save(os.path.join(out_dir, "logo-dark-mode.png"), "PNG")

# 3. Monogram mark only (the top CC with dress)
# In cropped image, monogram is in the upper ~65%
w, h = cropped_transparent.size
monogram_crop = cropped_transparent.crop((int(w * 0.15), 0, int(w * 0.85), int(h * 0.62)))
monogram_crop.save(os.path.join(out_dir, "logo-mark.png"), "PNG")

# Favicon:
fav = monogram_crop.copy()
fav.thumbnail((128, 128), Image.Resampling.LANCZOS)
fav.save(os.path.join(out_dir, "favicon.png"), "PNG")

print("All logo assets created successfully!")
