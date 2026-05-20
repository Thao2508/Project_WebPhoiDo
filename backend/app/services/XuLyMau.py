import math

from app.models.Mau import Mau

def hex_to_rgb(hex_color):

    hex_color = hex_color.lstrip('#')

    return tuple(

        int(hex_color[i:i+2], 16)

        for i in (0, 2, 4)
    )

def color_distance(rgb1, rgb2):

    return math.sqrt(

        (rgb1[0] - rgb2[0]) ** 2 +

        (rgb1[1] - rgb2[1]) ** 2 +

        (rgb1[2] - rgb2[2]) ** 2
    )

def find_closest_color(hex_input, db):

    input_rgb = hex_to_rgb(hex_input)

    colors = db.query(Mau).all()

    best_match = None

    min_distance = 999999

    for color in colors:

        db_rgb = hex_to_rgb(color.maMauHex)

        distance = color_distance(
            input_rgb,
            db_rgb
        )

        if distance < min_distance:

            min_distance = distance

            best_match = color

    return best_match
