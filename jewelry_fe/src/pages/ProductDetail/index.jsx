import ProductSlider from "../../components/ProductSlider"
import { Button } from 'antd'

const ProductDetail = () => {
  return (
    <div className="py-4">
      <div className='flex items-start gap-4 relative'>
        <ProductSlider />

        <div className="flex flex-col gap-4 sticky top-4">
          <p className="text-lg text-[#003468] font-bold">
            Cặp nhẫn cưới Kim cương Vàng 18K PNJ Vàng Son
          </p>
          <p className="text-lg text-[#003468]">
            24.643.000 ₫
          </p>
          <p className="text-xs text-[#726f6f] italic">
            (Giá sản phẩm thay đổi tùy trọng lượng vàng và đá)
          </p>
          <p className="text-xs text-[#726f6f]">
            Vượt qua hành trình mài giũa dưới bàn tay của các nghệ nhân, kim cương gắn liền với biểu tượng của tình yêu thủy chung, son sắt. Với sắc vàng chuẩn mực 18K rực rỡ cùng vẻ đẹp lấp lánh và tinh khiết của kim cương, PNJ mang đến cặp nhẫn cưới hiện đại nhưng vẫn giữ được nét truyền thống vốn có.
          </p>
          <p className="text-xs text-[#726f6f]">
            Không chỉ có vai trò là vật đính ước thiêng liêng, nhẫn cưới kim cương còn thể hiện cá tính và phong cách của mỗi cặp đôi. Tại PNJ, các cặp đôi luôn có thể sở hữu những thiết kế nhẫn cưới kim cương vừa hợp lí về tài chính, vừa đẹp về mẫu mã.
          </p>
          <Button type="primary" danger>
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail