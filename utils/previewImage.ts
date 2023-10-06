import got from "got";
import lqip from "lqip-modern";
import { ExtendedRecordMap, PreviewImage, PreviewImageMap } from "notion-types";
import { ParsedDatabaseItemType } from "./parseDatabaseItem";
import { getPageImageUrls } from "notion-utils";
import { defaultMapImageUrl } from "react-notion-x";

export const makePreviewImage = async (url: string) => {
  const buffer = await got(url, { responseType: "buffer", resolveBodyOnly: true });
  
  // lqip가 못받는 이미지 포맷(heif, ico)은 lqip가 썸네일을 만들어줄 수 없음
  try {
    const { metadata: { dataURIBase64, originalHeight, originalWidth} } = await lqip(buffer);

    const result: PreviewImage = {
      dataURIBase64,
      originalHeight,
      originalWidth,
    };

    return result;
  } catch (error) {
    return null;
  }
};

export type MakePreviewImageType = Awaited<ReturnType<typeof makePreviewImage>>;

export const insertPreviewImage = async (databaseItems: ParsedDatabaseItemType[]) => {
  // 프리뷰 이미지를 넣어주자
  const previewImage = Promise.all(
    databaseItems.map(async (item) => {
      const { cover } = item;

      const previewImage = await makePreviewImage(cover);

      return {
        ...item,
        previewImage,
      };
    })
  );

  return previewImage;
};

/**
 * 
 * 데이터타입:
 * {
      [url]: [previewUrl]
    }
 */

export const insertPreviewImageToRecordMap = async (recordMap: ExtendedRecordMap): Promise<PreviewImageMap> => {
  const urls = getPageImageUrls(recordMap, { mapImageUrl: defaultMapImageUrl });

  const previewImageMap = await Promise.all(
    urls.map(async (url) => ([url, await makePreviewImage(url)]))
  );

return Object.fromEntries(previewImageMap);
}