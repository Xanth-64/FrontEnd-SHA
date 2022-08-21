import template from "../api_schemas/template";

type templateAdaptionCardProps = {
    currentTemplate?: template;
    loading: boolean;
    fetchTemplate: () => void;
}

export default templateAdaptionCardProps;