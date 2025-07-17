import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import "./styles.css";
import { Box } from "@mui/material";

interface IContainer {
    block: any,
    blockIndex: string[],
    setBlocks: any
}

const sortableOptions = {
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
    ghostClass: "ghost",
    group: "shared",
    forceFallback: true
};
export const Container = ({ block, blockIndex, setBlocks }: IContainer) => {
    return (
        <>
            <ReactSortable
                key={block.id}
                list={block.children}
                setList={(currentList) => {
                    setBlocks((sourceList: any) => {
                        const tempList = [...sourceList];
                        const _blockIndex = [...blockIndex];
                        const lastIndex: string = _blockIndex.pop()!;
                        const lastArr = _blockIndex.reduce((arr: any, i: string) => arr[i]["children"], tempList);
                        lastArr[lastIndex]["children"] = currentList;
                        return tempList;
                    });
                }}
                {...sortableOptions}
            >
                {block.children &&
                    block.children.map((childBlock: any, index: string) => {
                        return (
                            <BlockWrapper
                                key={childBlock.id}
                                block={childBlock}
                                blockIndex={[...blockIndex, index]}
                                setBlocks={setBlocks}
                            />
                        );
                    })}
            </ReactSortable>
        </>
    );
}
function BlockWrapper({ block, blockIndex, setBlocks }: IContainer) {
    // console.log(block);
    if (!block) return null;
    if (block.type === "container") {
        return (
            <Box className="block">
                container: {block.content}
                <Container
                    block={block}
                    setBlocks={setBlocks}
                    blockIndex={blockIndex}
                />
            </Box>
        );
    } else {
        return (
            <Box className="block">
                text: {block.content}
            </Box>
        );
    }
}