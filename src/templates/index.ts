import type { ReactElement } from "react";
import type { Theme } from "../core/config";
import Default from "./default";

export type TemplateProps = {
	theme: Theme;
	[key: string]: unknown;
};

export type TemplateFn = (props: TemplateProps) => ReactElement;

export const templates: Record<string, TemplateFn> = {
	default: Default as TemplateFn,
};
