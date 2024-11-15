import { useParams } from "react-router-dom"
import ProductSlider from "../../components/ProductSlider"
import { Button, message, Rate, Select } from 'antd'
import { useEffect, useState } from "react";
import productsApi from "../../apis/products";
import { formatCurrency } from "../../utils/formatText";
import { useCartStore } from "../../store/cart";
import { useCartDrawerStore } from "../../store/cartDrawer";
import { images } from "../../assets/images";
import { svgs } from "../../assets/svgs";
import clsx from 'clsx';
import { DownOutlined, StarFilled } from '@ant-design/icons'

const ProductDetail = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState();
  const [selectedTab, setSelectedTab] = useState(1);
  const [showedQuestions, setShowedQuestions] = useState([])

  const increaseCartProduct = useCartStore(state => state.increaseCartProduct)
  const setIsOpenCartDrawer = useCartDrawerStore(s => s.setIsOpenCartDrawer);

  const handleAddToCart = (product) => {
    increaseCartProduct(product, 1);
    message.success("Đã thêm vào giỏ hàng");
    setIsOpenCartDrawer(true);
  }

  const handleOnClickQuestion = (questionIndex) => {
    setShowedQuestions(pre => {
      if (pre.findIndex(question => question === questionIndex) !== -1) {
        return pre.filter(question => question !== questionIndex)
      }
      return [...pre, questionIndex]
    })
  }

  const handleChangeRatingFilter = (value) => {
    console.log(value)
  }

  useEffect(() => {
    const fetchProductDetail = async (slug) => {
      const data = await productsApi.getBySlug(slug).then(res => res?.data?.data)

      setProduct(data)
    }

    if (slug) {
      fetchProductDetail(slug)
    }
  }, [slug])

  return (
    <div className="py-4">
      <div className='flex md:flex-row flex-col items-start gap-4 relative'>
        <div className="flex flex-col gap-[4px]">
          <ProductSlider product={product} />

          <div className="max-w-[600px] flex justify-center items-center  py-1">
            <h2
              className={clsx(
                "sm:text-[14px] inline-block w-1/3 px-[10px] py-[10px] text-[13px] text-center font-medium cursor-pointer text-[#000000] rounded-sm",
                { "border-b-2 border-solid border-[#003468] bg-[#F2F2F2]": selectedTab === 1 }
              )}
              onClick={() => setSelectedTab(1)}
            >
              Chính sách hậu mãi
            </h2>
            <h2
              className={clsx(
                "sm:text-[14px] inline-block w-1/3 px-[10px] py-[10px] text-[13px] text-center font-medium cursor-pointer text-[#000000] rounded-sm",
                { "border-b-2 border-solid border-[#003468] bg-[#F2F2F2]": selectedTab === 2 }
              )}
              onClick={() => setSelectedTab(2)}
            >
              Mô tả sản phẩm
            </h2>
            <h2
              className={clsx(
                "sm:text-[14px] inline-block w-1/3 px-[10px] py-[10px] text-[13px] text-center font-medium cursor-pointer text-[#000000] rounded-sm",
                { "border-b-2 border-solid border-[#003468] bg-[#F2F2F2]": selectedTab === 3 }
              )}
              onClick={() => setSelectedTab(3)}
            >
              Câu hỏi thường gặp
            </h2>
          </div>

          <div className="max-w-[600px] my-[20px]">
            <p className={clsx(
              "text-base text-[#726f6f]",
              selectedTab === 1 ? "block" : "hidden"
            )}>
              {product?.description}
            </p>

            <p className={clsx(
              "text-base text-[#726f6f]",
              selectedTab === 2 ? "block" : "hidden"
            )}>
              <p className="p-[4px_8px] text-[14px]">
                Loại đá chính : Kim cương
              </p>

              <p className="p-[4px_8px] text-[14px] bg-[#f2f2f2]">
                Màu đá chính : Trắng
              </p>

              <p className="p-[4px_8px] text-[14px]">
                Giới tính : Nữ
              </p>

              <p className="p-[4px_8px] text-[14px] bg-[#f2f2f2]">
                Thương hiệu : Disney|PNJ
              </p>
            </p>

            <p className={clsx(
              "text-base text-[#726f6f]",
              selectedTab === 3 ? "block" : "hidden"
            )}>
              <div
                className="my-[10px] text-justify text-[#000000]"
                onClick={() => handleOnClickQuestion(1)}
              >
                <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[#003468] rounded-md">
                  <div className="shadow-lg"></div>
                  <div className="flex flex-col justify-between items-center px-2 py-2 text-[16px] cursor-pointer">
                    <div className="text-[#003468] flex justify-between items-center w-full">
                      Mua Online có ưu đãi gì đặc biệt cho tôi?
                      <DownOutlined className={clsx(showedQuestions.includes(1) ? "rotate-180" : "")} />
                    </div>

                    <div className={clsx(
                      "py-1 text-[16px] text-[#5A5A5A]",
                      showedQuestions.includes(1) ? "block" : "hidden"
                    )}>
                      <p>
                        PNJ mang đến nhiều trải nghiệm mua sắm hiện đại khi mua Online:
                      </p>
                      <p>
                        - Ưu đãi độc quyền Online với hình thức thanh toán đa dạng.
                      </p>
                      <p>
                        - Đặt giữ hàng Online, nhận tại cửa hàng.
                      </p>
                      <p>
                        - Miễn phí giao hàng từ 1-7 ngày trên toàn quốc và giao hàng trong 3 giờ tại một số khu vực trung tâm với các sản phẩm có gắn nhãn.
                      </p>
                      <p>
                        - Trả góp 0% lãi suất với đơn hàng từ 3 triệu.
                      </p>
                      <p>
                        - Làm sạch trang sức trọn đời, khắc tên miễn phí theo yêu cầu (tùy kết cấu sản phẩm) và chính sách bảo hành, đổi trả dễ dàng tại hệ thống PNJ trên toàn quốc.
                      </p>
                      <p>
                        PNJ hân hạnh phục vụ quý khách qua Hotline 1800 5454 57 (08:00-21:00, miễn phí cuộc gọi).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="my-[10px] text-justify text-[#000000]"
                onClick={() => handleOnClickQuestion(2)}
              >
                <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[#003468] rounded-md">
                  <div className="shadow-lg"></div>
                  <div className="flex flex-col justify-between items-center px-2 py-2 text-[16px] cursor-pointer">
                    <div className="text-[#003468] flex justify-between items-center w-full">
                      PNJ có thu mua lại trang sức không?
                      <DownOutlined className={clsx(showedQuestions.includes(2) ? "rotate-180" : "")} />
                    </div>

                    <div className={clsx(
                      "py-1 text-[16px] text-[#5A5A5A]",
                      showedQuestions.includes(2) ? "block" : "hidden"
                    )}>
                      <p>
                        PNJ có dịch vụ thu đổi trang sức PNJ tại hệ thống cửa hàng trên toàn quốc. Chi tiết xem tại:
                      </p>
                      <p>
                        https://www.pnj.com.vn/chinh-sach-bao-hanh-va-thu-doi.html
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="my-[10px] text-justify text-[#000000]"
                onClick={() => handleOnClickQuestion(3)}
              >
                <div className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] text-[#003468] rounded-md">
                  <div className="shadow-lg"></div>
                  <div className="flex flex-col justify-between items-center px-2 py-2 text-[16px] cursor-pointer">
                    <div className="text-[#003468] flex justify-between items-center w-full">
                      Nếu đặt mua Online mà sản phẩm không đeo vừa thì có được đổi không?
                      <DownOutlined className={clsx(showedQuestions.includes(3) ? "rotate-180" : "")} />
                    </div>

                    <div className={clsx(
                      "py-1 text-[16px] text-[#5A5A5A]",
                      showedQuestions.includes(3) ? "block" : "hidden"
                    )}>
                      <p>
                        PNJ có chính sách thu đổi trang sức vàng trong vòng 48 giờ, đổi ni/ size trang sức bạc trong vòng 72 giờ. Quý khách sẽ được áp dụng đổi trên hệ thống PNJ toàn quốc.
                      </p>
                      <p>
                        • Sản phẩm đeo lâu có xỉn màu không, bảo hành như thế nào?
                      </p>
                      <p>
                        Do tính chất hóa học, sản phẩm có khả năng oxy hóa, xuống màu. PNJ có chính sách bảo hành miễn phí về lỗi kỹ thuật, nước xi:
                      </p>
                      <p>
                        - Trang sức vàng: 6 tháng.
                      </p>
                      <p>
                        - Trang sức bạc: 3 tháng.
                      </p>
                      <p>
                        Ngoài ra, PNJ cũng cung cấp dịch vụ siêu âm làm sạch bằng máy chuyên dụng (siêu âm, không xi) miễn phí trọn đời tại hệ thống cửa hàng.
                      </p>
                      <p>
                        • Tôi muốn xem trực tiếp, cửa hàng nào còn hàng?
                      </p>
                      <p>
                        Với hệ thống cửa hàng trải rộng khắp toàn quốc, quý khách vui lòng liên hệ Hotline 1800 5454 57 (08:00-21:00, miễn phí cuộc gọi) để kiểm tra cửa hàng còn hàng và tư vấn chương trình khuyến mãi Online trước khi đến cửa hàng.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sticky top-4 px-4 w-full">
          <p className="text-xl text-[#003468] font-bold">
            {product?.name}
          </p>
          <div className="flex items-center justify-between">
            <p>
              Mã: GNDD00W004380-GNDD00W004379
            </p>
            <div className="flex items-center gap-4 text-[13px] font-light text-[#4C4C4C]">
              <Rate value={5} disabled className="text-[15px]" />
              <p>
                (5) đã bán
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl text-[#003468]">
              {formatCurrency(product?.price)}
            </p>
            <p className="text-[14px] text-[#4C4C4C]">
              Chỉ cần trả {formatCurrency(product?.price / 6)}/tháng
            </p>
          </div>
          <p className="text-[14px] font-light text-[#4C4C4C] italic">
            (Giá sản phẩm thay đổi tùy trọng lượng vàng và đá)
          </p>
          <p className="text-base text-[#726f6f] flex items-center gap-2">
            Còn hàng - <span><img src={images.zalo} className="w-[20px]"></img></span> Nhấn để được tư vấn và nhận ưu đãi
          </p>
          <div className="flex items-center justify-between p-[5px_10px] rounded-md bg-[#f2f2f2]">
            <div className="flex items-center gap-4">
              <img src={svgs.shipping}></img>
              <p className="text-[13px] font-bold text-[#003468]">
                Miễn phí giao hàng
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img src={svgs.shopping247}></img>
              <p className="text-[13px] font-bold text-[#003468]">
                Phục vụ 24/7
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img src={svgs.thudoi}></img>
              <p className="text-[13px] font-bold text-[#003468]">
                Thu đổi 48h
              </p>
            </div>
          </div>

          <Button
            type="primary"
            danger
            className="w-full   bg-[#ad2a36] flex flex-1 justify-center items-center flex-col font-bold text-white h-[40px] rounded-lg mt-[10px] "
            onClick={() => handleAddToCart(product)}
          >
            <p className="text-[13px]">
              Thêm vào giỏ hàng
            </p>
            <p className="text-[11px] italic">
              (Giao hàng miễn phí tận nhà hoặc nhận tại cửa hàng)
            </p>
          </Button>
        </div>
      </div>

      <div>
        <div className="bg-[#fff] rounded-lg  mb-4 mt-2">
          <h2 className="text-[20px] text-[#323232]">Đánh giá từ khách hàng</h2>
          <div className="block sm:flex justify-between ">

            <div className="flex-1 sm:block hidden gap-4">
              <div className="flex items-center gap-5 h-[33px]">
                <p className="text-[32px] text-black">
                  5.0
                </p>
                <Rate value={5} disabled />
              </div>

              <p>
                Tổng cộng 2 đánh giá từ khách hàng
              </p>

              <button className="my-[10px] px-[7px] h-[40px] w-auto  leading-[30px] bg-[#003468] text-white text-[14px] rounded-lg text-center   flex items-center cursor-pointer">Viết đánh giá</button>
            </div>

            <Select
              size="large"
              defaultValue="5"
              style={{ width: 120 }}
              onChange={handleChangeRatingFilter}
              options={[
                { value: '5', label: <p>5 <span><StarFilled className="text-yellow-500" /></span></p> },
                { value: '4', label: <p>4 <span><StarFilled className="text-yellow-500" /></span></p> },
                { value: '3', label: <p>3 <span><StarFilled className="text-yellow-500" /></span></p> },
                { value: '2', label: <p>2 <span><StarFilled className="text-yellow-500" /></span></p> },
                { value: '1', label: <p>1 <span><StarFilled className="text-yellow-500" /></span></p> },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="py-1">
              <div className="bg-white py-2 lg:flex gap-4 justify-between  border-t-[3px] border-gray-300 rounded-lg">
                <div className="flex-1">
                  <div className="flex lg:items-start lg:flex-col  justify-between items-center my-[10px]">
                    <div className="flex justify-between items-center gap-2 flex-1">
                      <div className="flex justify-between items-center  gap-2 ">
                        <p className="overflow-hidden truncate  w-[130px] sm:w-auto  line-clamp-1">
                          Nhi
                        </p>
                        <Rate value={5} disabled />
                      </div>

                      <div className="flex justify-between items-center gap-2 text-black">
                        <div className="size-[5px] rounded-full bg-[#45C352]"></div>
                        <span className="text-[#45C352] text-[12px]">Đã mua</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-[#5A5A5A] my-[10px] max-w-[700px] text-left">
                    Cho mình hỏi giá này là 1 chiếc hay 1 cặp ạ
                  </div>
                </div>
              </div>
            </div>

            <div className="py-1">
              <div className="bg-white py-2 lg:flex gap-4 justify-between  border-t-[3px] border-gray-300 rounded-lg">
                <div className="flex-1">
                  <div className="flex lg:items-start lg:flex-col  justify-between items-center my-[10px]">
                    <div className="flex justify-between items-center gap-2 flex-1">
                      <div className="flex justify-between items-center  gap-2 ">
                        <p className="overflow-hidden truncate  w-[130px] sm:w-auto  line-clamp-1">
                          Lam Trinh
                        </p>
                        <Rate value={5} disabled />
                      </div>

                      <div className="flex justify-between items-center gap-2 text-black">
                        <div className="size-[5px] rounded-full bg-[#45C352]"></div>
                        <span className="text-[#45C352] text-[12px]">Đã mua</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="text-[#5A5A5A] my-[10px] max-w-[700px] text-left">
                    Sản phẩm giảm thêm 200k khi đặt hàng online, vậy có cần thanh toán trước hay ko ? hay đặt hàng rồi đến cửa hàng nhận ? PNJ có hỗ trợ khắc chữ cho nhẫn ko ?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail