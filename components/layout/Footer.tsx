interface FooterProps {
    className?: string
}

const Footer: React.FC<FooterProps> = ({ className }) => {
    return (
        <footer className={`bg-gray-800 text-white p-4 ${className}`}>
            <p className="text-center">
                © {new Date().getFullYear()} Admin Dashboard. All rights
                reserved.
            </p>
        </footer>
    )
}

export default Footer
