import { CSSProperties } from 'react';

export interface IIconProps {
	scale?: number;
	color?: string;
	rotate?: number;
	className?: string;
	style?: CSSProperties | { [key: string]: string | number | any };
	active?: boolean;
	hide?: boolean;
}

export const IconLogOut = (props: IIconProps) => {
	const { className = '', scale = 1, color = '#000', style = {} } = props;
	return (
		<svg
			className={className}
			width={`${scale * 24}px`}
			style={style}
			height={`${scale * 24}px`}
			viewBox='0 0 200 200'
			fill={color}
		>
			<path d='M156.31,43.63a9.9,9.9,0,0,0-14,14,60.1,60.1,0,1,1-85,0,9.9,9.9,0,0,0-14-14c-31,31-31,82,0,113s82,31,113,0A79.37,79.37,0,0,0,156.31,43.63Zm-56.5,66.5a10,10,0,0,0,10-10v-70a10,10,0,0,0-20,0v70A10,10,0,0,0,99.81,110.13Z' />
		</svg>
	);
};
