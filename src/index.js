const css2str = (css) => Object.keys(css).map((k) => `${k}:${css[k]};`).join('');

const linearise = (points) => points.map((p) => `${p.x},${p.y}`).join(' ');

module.exports = (width, height) => {
    let output = '';

    // splitting declaration from packing of methods to allow chainability
    const svg = {};

    const toString = () => `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
		"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
 		<svg version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="0 0 ${width} ${height}"
			enable-background="new 0 0 ${width} ${height}"
			xml:space="preserve"
			x="0px" y="0px"
            width="${width}px"
            height="${height}px"
            >
			<g>
            	${output}
			</g>
        </svg>
    `;

    const polygon = (points, style) => {
        output += `
            <polygon
                points="${linearise(points)}"
                style="${css2str(style)}"
                />
        `;

        return svg;
    };

    const text = (text, position, style) => {
        output += `
            <text
                x="${position.x}"
                y="${position.y}"
                style="${css2str(style)}">

                ${text}

            </text>
        `;

        return svg;
    };

    const circle = (point, radius, style) => {
        output += `
            <circle
                cx="${point.x}"
                cy="${point.y}"
                r="${radius}"
                style="${css2str(style)}"
                />
        `;
    };

    Object.assign(svg, {
        polygon,
        text,
        circle,
        toString
    });

    return svg;
};
