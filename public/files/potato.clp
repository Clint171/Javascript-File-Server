(deftemplate-documentation potato-disease
  "A template for representing potato diseases."
  (slot name
    "The name of the potato disease."
    (type STRING))
  (slot symptoms
    "A list of the symptoms of the potato disease."
    (type (STRING))))


(assert (potato-disease
  (name late-blight)
  (symptoms (brown-spots-on-leaves) (white-fungal-growth-on-underside-leaves) (sunken-brown-lesions-on-tubers))))

(assert (potato-disease
  (name common-scab)
  (symptoms (rough-corky-patches-on-tuber-skin))))

(assert (potato-disease
  (name early-blight)
  (symptoms (small-brown-spots-on-leaves) (concentric-rings-on-leaves))))

(assert (potato-disease
  (name blackleg)
  (symptoms (brown-lesions-on-stems) (wilting-and-death-of-plants))))

(assert (potato-disease
  (name bacterial-wilt)
  (symptoms (wilting-and-death-of-plants) (brown-vascular-ring-visible-when-stem-is-cut))))

(assert (potato-disease
  (name potato-virus-y)
  (symptoms (yellow-mottling-of-leaves) (stunting-of-plants) (necrosis-on-tubers))))

(assert (potato-disease
  (name potato-leafroll-virus)
  (symptoms (upward-rolling-of-leaves) (leathery-leaves) (small-and-deformed-tubers))))

(deffunction-documentation print-potato-disease
  "Prints the name of the potato disease to the console."
  (argument disease
    "The name of the potato disease."
    (type STRING)))

(run-until-halt)
