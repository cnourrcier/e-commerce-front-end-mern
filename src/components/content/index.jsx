import React, { useState } from "react";

export default function Content({ tabs, currentSelected }) {

    return (
        <div className='content'>
            {tabs?.length && tabs[currentSelected]?.content}
        </div>
    )
}