import parse from "html-react-parser";

export const formatContent = (content) => {
  // Bỏ qua các thẻ không mong muốn, ví dụ <script> hoặc <style>
  let cleanedContent = content
    ? content
        .replace(/<script.*?>.*?<\/script>/g, "")
        .replace(/<style.*?>.*?<\/style>/g, "")
    : "";

  console.log(
    "🚀 ~ file: formatContent.js:6 ~ formatContent ~ cleanedContent:",
    cleanedContent
  );

  return parse(cleanedContent, {
    replace: (domNode) => {
      if (domNode.type === "tag") {
        if (domNode.name === "img") {
          // Thêm style cho thẻ <img>
          domNode.attribs.style =
            "aspect-ratio: 4 / 2; object-fit: cover; max-width: 100%; margin: 10px auto;"; // Thêm style tùy chỉnh
        } else domNode.attribs.style = "margin-bottom: 10px;";
      }
    },
  });
};
