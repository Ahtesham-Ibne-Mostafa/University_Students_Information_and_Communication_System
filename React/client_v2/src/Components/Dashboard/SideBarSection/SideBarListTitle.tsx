interface Props {
    title: string,
    isSelected: boolean,
}

function SideBarListTitle({ title, isSelected }: Props) {
    return (<span className={isSelected ? "smallText selectedSection" : "smallText"} >
        {title}
    </span>);
}

export default SideBarListTitle
