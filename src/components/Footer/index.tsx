import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import and Configure Font Awesome
library.add(fab);

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1">
            <h2 className="font-bold text-lg mb-4">Movies BC62</h2>
            <p>
              Công ty Cổ phần Bất động sản và Giải trí CGV Việt Nam
              <br />
              Lầu 4, tòa nhà Pearl Plaza, 561 Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. HCM
            </p>
            <p>Số điện thoại: (028) 3844 6616</p>
            <p>Email: cgv@cgv.vn</p>
          </div>
          <div className="col-span-1">
            <h2 className="font-bold text-lg mb-4">Hỗ trợ</h2>
            <ul>
              <li>
                <a href="/help/faqs">Câu hỏi thường gặp</a>
              </li>
              <li>
                <a href="/help/contact-us">Liên hệ với chúng tôi</a>
              </li>
              <li>
                <a href="/help/privacy-policy">Chính sách bảo mật</a>
              </li>
              <li>
                <a href="/help/terms-and-conditions">Điều khoản và điều kiện</a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h2 className="font-bold text-lg mb-4">Kết nối với chúng tôi</h2>
            <ul className="flex space-x-4">
              <li>
                <a href="https://www.facebook.com/CGV.VN/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fab', 'facebook-f']} /> 
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/cgv_vietnam/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fab', 'instagram']} /> 
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/c/CGVCinemas" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={['fab', 'youtube']} />
                </a>
              </li>
            </ul>
          </div>

        </div>
        <div className="mt-8 text-center">
          <p>© {new Date().getFullYear()} Cybersolf. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}