from PIL import Image
import webcolors
import colorsys as cs
import numpy as np
import scipy
import scipy.misc
import scipy.cluster
from scipy.spatial import distance
import os
import json
import pickle

# Method to get closes CSS3 color name from rgb 
# from: http://stackoverflow.com/questions/9694165/convert-rgb-color-to-english-color-name-like-green
def closest_colour(requested_colour):
    min_colours = {}
    for key, name in webcolors.css3_hex_to_names.items():
        r_c, g_c, b_c = webcolors.hex_to_rgb(key)
        rd = (r_c - requested_colour[0]) ** 2
        gd = (g_c - requested_colour[1]) ** 2
        bd = (b_c - requested_colour[2]) ** 2
        min_colours[(rd + gd + bd)] = name
    return min_colours[min(min_colours.keys())]

def get_colour_name(requested_colour):
    try:
        closest_name = webcolors.rgb_to_name(requested_colour)
    except ValueError:
        closest_name = closest_colour(requested_colour)
    return closest_name

# Method to convert to CMYK
# from http://stackoverflow.com/questions/14088375/how-can-i-convert-rgb-to-cmyk-and-vice-versa-in-python
cmyk_scale = 100

def rgb_to_cmyk(r,g,b):
    if (r == 0) and (g == 0) and (b == 0):
        # black
        return 0, 0, 0, cmyk_scale

    # rgb [0,255] -> cmy [0,1]
    c = 1 - r / 255.
    m = 1 - g / 255.
    y = 1 - b / 255.

    # extract out k [0,1]
    min_cmy = min(c, m, y)
    c = (c - min_cmy) / (1 - min_cmy)
    m = (m - min_cmy) / (1 - min_cmy)
    y = (y - min_cmy) / (1 - min_cmy)
    k = min_cmy
    return c*cmyk_scale, m*cmyk_scale, y*cmyk_scale, k*cmyk_scale

# Method to trim the floats in a list to two decimal places
def float_minner(float_list):
    return ['%.2f' % elem for elem in float_list]

# Method to find the closest pantone name from a scraped 
# set of pantone -> rgb mappings 
# (scraped from http://rgb.to/pantone/coated/page/1)
# Custom!
rgb_to_pantone = pickle.load(open("rgb_to_pantone.p", "rb"))
rgb_keys = rgb_to_pantone.keys()

def closest_pantone(r, g, b):
    min_dist = 255
    x1 = (r, g, b)
    i_min = -5
    # Find closest pantone color 
    for i in range(0, len(rgb_keys)):
        x2 = rgb_keys[i].split(", ")
        x2 = tuple(map(int, x2))
        dist = distance.euclidean(x1, x2)
        if dist < min_dist:
            min_dist = dist
            i_min = i
    return rgb_to_pantone[rgb_keys[i_min]]


# Main loop to extract "primary" colors using kmeans clustering
# and get additional info for each of the colors 
# (hex, css3 name, pantone name etc)
# http://stackoverflow.com/questions/3241929/python-find-dominant-most-common-color-in-an-image

# Set number of main colors to be extracted
NUM_CLUSTERS = 5
data_arr = []

# Iterate the files in the directory
directory = "img_squared/"
for fn in os.listdir(directory):

    im = Image.open('img_squared/' + fn)
    # resizing image for speed
    im = im.resize((150, 150))
    ar = scipy.misc.fromimage(im)
    shape = ar.shape
    ar = ar.reshape(scipy.product(shape[:2]), shape[2])

    # perform kmeans clustering on pixel rgb values
    ar = ar.astype(float)
    codes, dist = scipy.cluster.vq.kmeans(ar, NUM_CLUSTERS)
    # Getting main colors
    vecs, dist = scipy.cluster.vq.vq(ar, codes)
    counts, bins = scipy.histogram(vecs, len(codes))

    # Get hexes, rgbs, names, pantones
    color_data = []
    hexes = []
    rgbs = []
    c_names = []
    cmyks = []
    text_colors = []
    pantone_names = []
    codes = scipy.rint(codes).astype(int)
    # For each "primary" color
    for i in range(0, len(codes)):
        single_color_data = {}
        # hexes
        hexes.append(''.join(chr(c) for c in codes[i]).encode('hex'))
        # rgbs
        cur = ""
        for j in range(0, len(codes[i])):
            cur = cur + str(codes[i][j]) + ", "
        cur = cur[:-2]
        rgbs.append(cur)
        # Closest CSS3 name
        cur = tuple(map(int, cur.split(",")))
        c_names.append(get_colour_name(cur))
        # CMYK
        r = cur[0]
        g = cur[1]
        b = cur[2]
        cmyk = float_minner(list(rgb_to_cmyk(r, g, b)))
        cmyk = (str(cmyk)[1:-1]).replace("'", "")
        cmyks.append(cmyk)
        # Closest Pantone name
        pantone_name = closest_pantone(r, g, b)
        pantone_names.append(pantone_name)

        # Contrasting text color (black or white)
        if(r > 180 and g > 180 and b > 180):
            text_color = "black"
        else:
            text_color = "white"
        text_colors.append(text_color)

        # Load each color's data into a dictionary
        # and append each dictionary to a list
        single_color_data['rgb'] = rgbs[i]
        single_color_data['hex'] = hexes[i]
        single_color_data['cmyk'] = cmyks[i]
        single_color_data['text_color'] = text_colors[i]
        single_color_data['c_name'] = c_names[i]
        single_color_data['pantone_name'] = pantone_names[i]
        color_data.append(single_color_data)

    # get name by removing ".jpg" file extention
    name = fn[:-4]

    # Concatenate the shutterstock color-search link using the base + hex codes
    shutter = "https://www.shutterstock.com/labs/palette/?image_type=photo&keyword=&colors="
    for i in range(0, len(hexes)):
        shutter = shutter + str(hexes[i]) + "%3B"
        
    # Pack up the json object for the single image
    data = {
            'name': name,
            'shutter_link': shutter,
            'src': fn,
            'flat_hex': hexes,
            'color_data': color_data
            }
            
    # Collect the json objects
    data_arr.append(data)

# Write out the json file
with open('json/data.json', 'w') as outfile:
    json.dump(data_arr, outfile)
