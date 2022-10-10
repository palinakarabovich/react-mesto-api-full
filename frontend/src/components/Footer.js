function Footer() {
    return (
        <footer className="footer page__center">
            <p className="footer__description">
                &copy; {(new Date).getFullYear()} Mesto Russia
            </p>
        </footer>
    )
}

export default Footer;