import { TableListProp } from "src/interfaces";
import { TabbedPane } from "@components/tabbedPane/tabbed.pane";
import { FeeReleaseTabState, FeeReleaseTabStateObject, FeeReleaseTypeList, IBillFeeClass, IBillPrePostStudentList, IBillTabPrePostStudentList } from "../../interface";
import { useEffect, useState } from "react";
import { InfoOutlined } from "@mui/icons-material";
import { IoWarningOutline } from "react-icons/io5";
import { StudentFeeList } from "./student.fee";
import { NepaliMonthEnum } from "@common/all.enum";
import { useDataProvider } from "@refinedev/core";
import { CiCircleCheck } from "react-icons/ci";
import { BILLING_FEE_RELEASE_PRERELEASE_URL } from "../../constant";
type ReleaseTabProps = {
    releaseTypes: FeeReleaseTypeList
    month: NepaliMonthEnum
    postDate: string
}
export const ReleaseTab = ({ releaseTypes, month, postDate }: ReleaseTabProps) => {
    const dataProvider = useDataProvider();
    const [tabState, setTabState] = useState<FeeReleaseTabStateObject>({});
    const [studentData, setStudentData] = useState<IBillTabPrePostStudentList>({})
    useEffect(() => {
        setTabState(Object.keys(releaseTypes).reduce((acc: FeeReleaseTabStateObject, e, index) => {
            acc[e] = {
                label: releaseTypes[e]?.fee?.fee?.name,
                icon: <InfoOutlined />,
                oldRelease: 0,
                duplicate: null,
                loaded: false
            }
            return acc
        }, {}))
    }, [releaseTypes])

    const handleSetTab = (feeClass: IBillFeeClass, state: FeeReleaseTabState) => {
        setTabState((pre: FeeReleaseTabStateObject) => {
            return {
                ...pre,
                [feeClass.id]: {
                    ...state
                }
            }
        })
    }

    useEffect(() => {
        const preloadData = async () => {
            for (const release in releaseTypes) {
                handleLoadPreRelease(release)
            }
        };
        preloadData();
    }, [month]);

    const handleLoadPreRelease = async (release: string) => {
        const { data } = await dataProvider().getList<IBillPrePostStudentList>({
            pagination: { current: 1, pageSize: 10 },
            resource: BILLING_FEE_RELEASE_PRERELEASE_URL,
            meta: { customQuery: { month, fee_class_id: releaseTypes[release]?.fee?.id, amount: releaseTypes[release]?.amount } },
        });
        setStudentData((pre: any) => {
            return {
                ...pre,
                [release]: data
            }
        })
        const oldRelease = data.filter((student) => student.previous.length > 0).length
        handleSetTab(releaseTypes[release].fee, {
            ...tabState[release],
            label: `${releaseTypes[release].fee.fee.name} (${oldRelease}/${data.length})`,
            oldRelease,
            duplicate: null,
            icon: oldRelease > 0 ? <IoWarningOutline color="warning" /> : <CiCircleCheck color="info" />,
            loaded: true,
        })
    }

    useEffect(() => {
        Object.entries(tabState).map(([key, value]) => {
            if (value.loaded === false) {
                handleLoadPreRelease(key)
            }
        })
    }, [tabState])
    const tabs = Object.entries(tabState).map(([key, value], index) => {
        return {
            label: value.label,
            content: (<StudentFeeList
                key={key}
                release={releaseTypes[key]}
                month={month}
                postDate={postDate}
                students={studentData[key]}
                handleSetTab={handleSetTab}
                tabState={tabState[key]}
            />),
            icon: value.icon,
            iconPosition: "end" as "end"
        }
    })

    return <TabbedPane tabs={tabs} />;
};
