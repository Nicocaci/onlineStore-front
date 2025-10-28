import React from "react";
import "../css/BrandSlider.css";

const logos = [
    "adidas.jpg",
    "asics.jpg",
    "balling.jpg",
    "brabo.jpg",
    "dita.jpg",
    "jdh.jpg",
    "malik.jpg",
    "obo.jpg",
    "osaka.jpg",
    "reves.jpg",
    "tk.jpg",
    "vlack.jpg"
];

const BrandSlider = () => {
    return (
        <div className="slider">
            <div className="slide-track">
                {logos.concat(logos).map((logo, i) => (
                    <div className="slide" key={i}>
                        <img src={`/marcas/${logo}`} alt={`Logo ${logo}`} />

                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandSlider;
