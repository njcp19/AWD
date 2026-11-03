import '../../css/theme.css';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import FlashMessage from '@/Components/FlashMessage';

// Shared shell for every page: fixed navbar, success toast, footer.
export default function SiteLayout({ children }) {
    return (
        <div className="site">
            <Navbar />
            <FlashMessage />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
