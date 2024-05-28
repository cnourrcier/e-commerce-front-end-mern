import React, { useEffect } from "react";

export default function Content({ tabs, currentSelected, resetCategory, setResetCategory }) {

    useEffect(() => {
        if (resetCategory) {
            setResetCategory(false);
        }
    }, [resetCategory, setResetCategory]);

    const selectedTab = tabs[currentSelected];
    const content = React.cloneElement(selectedTab.content, { resetCategory });

    return (
        <div className='content'>
            {tabs?.length && content}
        </div>
    )
}