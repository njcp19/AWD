import '../../css/portfolio.css';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import FlashMessage from '@/Components/FlashMessage';

// Shared shell used by every page: navbar, success toast, content, footer.
export default function PortfolioLayout({ children }) {
    return (
        <div className="pf-root">
            <Navbar />
            <FlashMessage />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
