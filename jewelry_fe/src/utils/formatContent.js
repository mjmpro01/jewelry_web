import parse from "html-react-parser";

export const formatContent = (content) => {
  // Bỏ qua các thẻ không mong muốn, ví dụ <script> hoặc <style>
  let cleanedContent = content
    .replace(/<script.*?>.*?<\/script>/g, "")
    .replace(/<style.*?>.*?<\/style>/g, "");

  return parse(cleanedContent);
};
