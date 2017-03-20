# adapted from:
# http://stackoverflow.com/questions/3241929/python-find-dominant-most-common-color-in-an-image
from PIL import Image
import scipy
import scipy.misc
import scipy.cluster
import os
import json

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

    # Clustering pixel array
    ar = ar.astype(float)
    codes, dist = scipy.cluster.vq.kmeans(ar, NUM_CLUSTERS)
    # Getting main colors
    vecs, dist = scipy.cluster.vq.vq(ar, codes)
    counts, bins = scipy.histogram(vecs, len(codes))

    # Converting main colors to hex
    hexes = []
    codes = scipy.rint(codes).astype(int)
    for i in range(0, len(codes)):
        hexes.append(''.join(chr(c) for c in codes[i]).encode('hex'))

    # Creating json objects for writing, trimming file extensions
    name = fn[:-4]
    data = {
            'name': name,
            'src': fn,
            'colors': hexes
            }
    # Collecting json objects
    data_arr.append(data)

# Write out the json objects
with open('data.json', 'w') as outfile:
    json.dump(data_arr, outfile)
