import * as React from 'react';
import clsx from 'clsx';
import { animated, useSpring } from '@react-spring/web';
import { styled, alpha } from '@mui/material/styles';
import { TransitionProps as Transition2Props } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import FolderRounded from '@mui/icons-material/FolderRounded';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { useTreeItem2, UseTreeItem2Parameters } from '@mui/x-tree-view/useTreeItem2';
import {
  TreeItem2Checkbox,
  TreeItem2Content,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from '@mui/x-tree-view/TreeItem2';
import { TreeItem2Icon } from '@mui/x-tree-view/TreeItem2Icon';
import { TreeItem2Provider } from '@mui/x-tree-view/TreeItem2Provider';
import { TreeItem2DragAndDropOverlay } from '@mui/x-tree-view/TreeItem2DragAndDropOverlay';
import { IRepoCollection } from '../../interface';
import { REPO_COLLECTION_URL } from '../../constant/server.urls';
import { useList } from '@refinedev/core';
import { CollectionType } from '../../constant/enum';
import { YesNoEnum } from '@common/all.enum';

type TransitionProps = Transition2Props & {
  children: React.ReactElement;
};

function DotIcon() {
  return (
    <Box
      sx={{
        width: 6,
        height: 6,
        borderRadius: '70%',
        bgcolor: 'warning.main',
        display: 'inline-block',
        verticalAlign: 'middle',
        zIndex: 1,
        mx: 1,
      }}
    />
  );
}
declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

const StyledTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.grey[400],
  position: 'relative',
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: theme.spacing(3.5),
  },
  ...theme.applyStyles('light', {
    color: theme.palette.grey[800],
  }),
})) as unknown as typeof TreeItem2Root;

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  flexDirection: 'row-reverse',
  borderRadius: theme.spacing(0.7),
  marginBottom: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  fontWeight: 500,
  [`&.Mui-expanded `]: {
    '&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon': {
      color: theme.palette.primary.dark,
      ...theme.applyStyles('light', {
        color: theme.palette.primary.main,
      }),
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: '16px',
      top: '44px',
      height: 'calc(100% - 48px)',
      width: '1.5px',
      backgroundColor: theme.palette.grey[700],
      ...theme.applyStyles('light', {
        backgroundColor: theme.palette.grey[300],
      }),
    },
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: 'white',
    ...theme.applyStyles('light', {
      color: theme.palette.primary.main,
    }),
  },
  [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    ...theme.applyStyles('light', {
      backgroundColor: theme.palette.primary.main,
    }),
  },
}));

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

const StyledTreeItemLabelText = styled(Typography)({
  color: 'inherit',
  fontFamily: 'General Sans',
  fontWeight: 500,
}) as unknown as typeof Typography;

interface CustomLabelProps {
  children: React.ReactNode;
  icon?: React.ElementType;
  expanded?: boolean;
}

function CustomLabel({
  icon: Icon,
  expanded,
  children,
  ...other
}: CustomLabelProps) {
  return (
    <TreeItem2Label
      {...other}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        // component={Icon}
        className="labelIcon"
        color="inherit"
        sx={{ mr: 1, fontSize: '1.2rem' }}
      />
      <StyledTreeItemLabelText variant="body2">{children}</StyledTreeItemLabelText>
    </TreeItem2Label>
  );
}

const isExpandable = (reactChildren: React.ReactNode) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable);
  }
  return Boolean(reactChildren);
};

interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, 'rootRef'>,
  Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
  children?: React.ReactNode; // Add this line to override the children property
}
const CustomTreeItem = React.forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: React.Ref<HTMLLIElement>,
) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
    publicAPI
  } = useTreeItem2({ id, itemId: `${itemId}`, children, label, disabled, rootRef: ref });

  return (
    <TreeItem2Provider itemId={`${itemId}`}>
      <StyledTreeItemRoot {...getRootProps(other)}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx('content', {
              'Mui-expanded': status.expanded,
              'Mui-selected': status.selected,
              'Mui-focused': status.focused,
              'Mui-disabled': status.disabled,
            }),
          })}
        >
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <TreeItem2Checkbox {...getCheckboxProps()} />
          <CustomLabel
            {...getLabelProps({ icon: FolderRounded, expandable: status.expanded })}
          />
          <TreeItem2DragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </CustomTreeItemContent>
        <TransitionComponent {...getGroupTransitionProps()} />
      </StyledTreeItemRoot>
    </TreeItem2Provider>
  );
});

type DirectoryExplorerProps = {
  setExpended: React.Dispatch<React.SetStateAction<string | undefined>>
  collection: IRepoCollection
  isDeleted?: YesNoEnum
}
export function DirectoryExplorer({ setExpended, collection, isDeleted = YesNoEnum.No }: DirectoryExplorerProps) {
  const [dirItems, setDirItems] = React.useState<IRepoCollection[]>([]);
  const not_path = collection.path + collection.id + ".";
  const { data } = useList<IRepoCollection>({
    pagination: { pageSize: 100 },
    resource: REPO_COLLECTION_URL,
    meta: { customQuery: { type: CollectionType.Folder, not_id: collection.id, not_path, ...(isDeleted == YesNoEnum.Yes ? { is_deleted: YesNoEnum.Yes } : {}) } },
    sorters: [{
      field: 'type',
      order: 'asc'
    },
    {
      field: 'label',
      order: 'asc'
    }
    ]
  })
  React.useEffect(() => {
    if (data) {
      setDirItems((pre: IRepoCollection[]) => {
        return mergeNestedStructures([...pre], data.data.map((item) => ({ ...item, itemId: `item${item.id}`, children: [] })))
      })
    }
  }, [data])

  const handleItemSelectionToggle = (
    event: React.SyntheticEvent,
    itemId: any,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      setExpended(itemId)
    }
  };
  return (
    <RichTreeView
      items={dirItems}
      onItemSelectionToggle={handleItemSelectionToggle}
      sx={{ minHeight: '20vh', height: 'fit-content', flexGrow: 1, overflowY: 'auto' }}
      slots={{ item: CustomTreeItem }}
    />
  );
}

/**
 * Converts a flat array of IRepoCollection into a nested structure.
 */
function buildNestedStructure(
  flatList: IRepoCollection[],
): IRepoCollection[] {
  const map = new Map<string, IRepoCollection>();
  const roots: IRepoCollection[] = [];

  flatList.forEach((item) => {
    map.set(item.id, { ...item, children: [] });
  });

  flatList.forEach((item) => {
    if (item.parent_id && map.has(item.parent_id)) {
      map.get(item.parent_id)?.children?.push(map.get(item.id)!);
    } else {
      roots.push(map.get(item.id)!);
    }
  });

  return roots;
}

/**
 * Merges two nested structures of IRepoCollection.
 */
function mergeNestedStructures(
  oldList: IRepoCollection[],
  newList: IRepoCollection[],
): IRepoCollection[] {
  const map = new Map<string, IRepoCollection>();

  function traverseAndMap(items: IRepoCollection[]) {
    items.forEach((item: IRepoCollection) => {
      if (!map.has(item.id)) {
        map.set(item.id, { ...item, children: [] });
      }
      if (item.children) {
        traverseAndMap(item.children);
      }
    });
  }

  // Map both old and new structures
  traverseAndMap(oldList);
  traverseAndMap(newList);

  // Rebuild the merged nested structure
  const mergedArray = Array.from(map.values());
  return buildNestedStructure(mergedArray);
}