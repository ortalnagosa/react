
const About = () => {
  return (
    <div className="min-h-screen px-4 py-10 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl dark:text-white">
        <h1 className="mb-10 text-center text-4xl font-bold text-green-400">
          About Us
        </h1>

        <p className="mb-6 text-justify text-base leading-relaxed">
          Welcome to OrtalsApp, your ultimate solution for creating, browsing,
          and managing business cards with ease. Our innovative platform is
          designed to cater to professionals and businesses of all sizes,
          offering a seamless and efficient way to handle all your business card
          needs.
        </p>

        <h2 className="mb-2 mt-10 text-2xl font-semibold text-green-400">
          Our Mission
        </h2>
        <p className="mb-6 text-justify text-base leading-relaxed">
          At OrtalsApp, we strive to simplify the way you network and manage
          your professional connections. Our mission is to provide a
          user-friendly, powerful tool that helps you create stunning business
          cards, efficiently manage your contacts, and enhance your professional
          presence.
        </p>

        <h2 className="mb-4 mt-10 text-center text-2xl font-semibold text-green-400">
          What We Offer
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-green-400">Create</h3>
            <p className="text-base leading-relaxed">
              Design unique and professional business cards effortlessly with
              our intuitive creation tools. Choose from a variety of templates,
              customize every detail, and ensure your business card stands out.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-green-400">Browse</h3>
            <p className="text-base leading-relaxed">
              Explore a wide range of business cards within our app. Find
              inspiration, discover new contacts, and connect with professionals
              from various industries.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-green-400">
              Coming Soon – CRM for Admins
            </h3>
            <p className="text-base leading-relaxed">
              We’re working on developing a powerful CRM system for admins,
              aiming to provide tools to manage business card data, users, and
              insights – stay tuned!
            </p>
          </div>
        </div>

        <h2 className="mb-4 mt-12 text-center text-2xl font-semibold text-green-400">
          Contact Us
        </h2>
        <div className="space-y-2 text-center">
          <p>Email: OrtalsApp@email.com</p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 1234 OrtalsApp St, OrtalsApp City, OrtalsApp Country</p>
        </div>
      </div>
    </div>
  );
};


export default About;
