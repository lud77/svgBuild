const css2str = (css) => Object.keys(css).map((k) => `${k}:${css[k]};`).join('');

const props2str = (props) => Object.keys(props).map((k) => `${k}="${props[k]}"`).join(' ');

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

    const polygon = (points, style, props) => {
        output += `
            <polygon
                points="${linearise(points)}"
                style="${css2str(style)}"
                ${props2str(props || {})}
                />
        `;

        return svg;
    };

    const rect = (tl, br, style, props) => {
        polygon([
            tl,
            { x: br.x, y: tl.y },
            br,
            { x: tl.x, y: br.y },
            tl
        ], style, props);

        return svg;
    };

    const text = (text, position, style, props) => {
        output += `
            <text
                x="${position.x}"
                y="${position.y}"
                style="${css2str(style)}"
                ${props2str(props || {})}>

                ${text}

            </text>
        `;

        return svg;
    };

    const circle = (point, radius, style, props) => {
        output += `
            <circle
                cx="${point.x}"
                cy="${point.y}"
                r="${radius}"
                style="${css2str(style)}"
                ${props2str(props || {})}
                />
        `;
    };

    const line = (point1, point2, style, props) => {
        output += `
            <line
                x1="${point1.x}"
                y1="${point1.y}"
                x2="${point2.x}"
                y2="${point2.y}"
                style="${css2str(style)}"
                ${props2str(props || {})}
                />
        `;
    };

    const elc = (type, style, props, content) => `
        <${type}
            style="${css2str(style)}"
            ${props2str(props || {})}>
            ${content}
        </${type}>
    `;

    const ele = (type, style, props) => `
        <${type}
            style="${css2str(style)}"
            ${props2str(props || {})}
            />
    `;

    const el = (type, style, props, content) =>
        content
            ? elc(type, style, props, content)
            : ele(type, style, props);

    const add = (content) => {
        output += content;
    };

    Object.assign(svg, {
        polygon,
        text,
        circle,
        line,
        el,
        add,
        toString
    });

    return svg;
};
