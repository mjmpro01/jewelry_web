import { ConfigProvider, Pagination } from 'antd';
import queryString from 'query-string';
import { useLocation, useSearchParams } from 'react-router-dom';

const PaginationComponent = ({ pagination }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    pageSize: "12",
  });

  const page = searchParams.get("page") || 1
  const pageSize = searchParams.get("pageSize") || 12

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000',
        },
      }}
    >
      <Pagination
        current={page || 1}
        total={(pagination?.pageCount || 1) * (pagination?.pageSize || 12)}
        pageSize={pageSize || 12}
        onChange={(page, pageSize) => {
          const updatedParams = new URLSearchParams({
            ...queryString.parse(location.search),
            page: page.toString(),
            pageSize: pageSize.toString(),
          });

          setSearchParams(updatedParams)
        }}
      />
    </ConfigProvider>
  );
};

export default PaginationComponent;
