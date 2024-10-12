import { svgs } from "../../assets/svgs"

const Footer = () => {
  return (
    <div className="container mx-auto grid grid-cols-2 gap-4 my-8">
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold">
          Công Ty Cổ Phần Vàng Bạc Đá Quý
        </p>

        <p className="text-base font-light">
          Giấy chứng nhận đăng ký doanh nghiệp do Sở Kế hoạch & Đầu tư TP.HCM cấp lần đầu ngày 02/01/2004. Ngành, nghề kinh doanh
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-lg font-bold uppercase">
          Kết nối với chúng tôi
        </p>
        <div className="flex items-center gap-2 mb-2">
          <img src={svgs.facebook} alt="" className="size-6" />
          <img src={svgs.instagram} alt="" className="size-6" />
          <img src={svgs.youtube} alt="" className="size-6" />
        </div>
        <p className="text-lg font-bold uppercase">
          Phương thức thanh toán
        </p>
        <div className="flex items-center gap-2 mb-2">
          <img src={svgs.visa} alt="" className="size-8" />
          <img src={svgs.mastercard} alt="" className="size-8" />
          <img src={svgs.jcb} alt="" className="size-8" />
        </div>
      </div>
    </div>
  )
}

export default Footer