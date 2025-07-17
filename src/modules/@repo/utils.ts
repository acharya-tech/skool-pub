import { FileCategoryEnum } from "@common/all.enum";
import { CONFIG } from "src/global-config";

export function getMapFileCategoryToIcon(category: FileCategoryEnum) {
  switch (category) {
    case FileCategoryEnum.Image:
      return `${CONFIG.assetsDir}/assets/icons/files/ic-img.svg`;
    case FileCategoryEnum.Document:
      return `${CONFIG.assetsDir}/assets/icons/files/ic-document.svg`;
    case FileCategoryEnum.Video:
      return `${CONFIG.assetsDir}/assets/icons/files/ic-video.svg`;
    case FileCategoryEnum.Archive:
      return `${CONFIG.assetsDir}/assets/icons/files/ic-zip.svg`;
    case FileCategoryEnum.Audio:
      return `${CONFIG.assetsDir}/assets/icons/files/ic-audio.svg`;
    case FileCategoryEnum.Other:
      return `${CONFIG.assetsDir}/assets/icons/files/ic-file.svg`;
    default:
      return `${CONFIG.assetsDir}/assets/icons/files/ic-file.svg`;
  }
}
