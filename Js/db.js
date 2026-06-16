// INITIAL DATABASE SEED DATA
const SEED_SERVICES = [
  {
    id: "s1",
    name: "Bridal Dress Rental",
    price: 500,
    image: "./Assets/dressing.jpeg",
    description: "Premium selection of luxury bridal gowns and dresses from world-class designers, with customized fittings included."
  },
  {
    id: "s2",
    name: "Groom Suit Rental",
    price: 400,
    image: "./Assets/grooms.jpg",
    description: "Sleek and elegant suits, tuxedos, and traditional groom ceremony outfits customized to your exact style."
  },
  {
    id: "s3",
    name: "Wedding Decoration",
    price: 700,
    image: "./Assets/mandapam_imag1.jpg",
    description: "Exquisite mandapams, luxury floral arrangements, backdrops, lighting, and layout setups tailored to your theme."
  },
  {
    id: "s4",
    name: "Luxury Wedding Cars",
    price: 600,
    image: "./Assets/car.jpg",
    description: "Premium class vehicles (Rolls Royce, Mercedes, classic vintage cars) with professional chauffeurs."
  },
  {
    id: "s5",
    name: "Photography & Video",
    price: 900,
    image: "./Assets/place.jpg",
    description: "Professional high-definition photo and video coverage, pre-wedding shoots, and beautifully edited ceremony videos."
  },
  {
    id: "s6",
    name: "Bridal Makeup Service",
    price: 300,
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
    description: "Personalized professional makeup styling, hair dressing, and trial sessions by elite bridal artists."
  }
];

const SEED_GALLERY = [
  { id: "g1", image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf", title: "Dreamy Golden Hour Bride", category: "dresses" },
  { id: "g2", image: "https://images.unsplash.com/photo-1519741497674-611481863552", title: "Classic White Veil Ceremony", category: "dresses" },
  { id: "g3", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91", title: "Bride Pre-wedding Fitting", category: "dresses" },
  { id: "g4", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc", title: "Flower Bouquet Details", category: "decor" },
  { id: "g5", image: "https://images.unsplash.com/photo-1529636798458-92182e662485", title: "Magical Mandapam Backdrop", category: "decor" },
  { id: "g6", image: "./Assets/food.jpg", title: "Delectable Buffet Reception", category: "decor" },
  { id: "g7", image: "./Assets/mandapam_imag1.jpg", title: "Royal Entry Layout", category: "decor" },
  { id: "g8", image: "./Assets/place.jpg", title: "Historic Castle Venue Setup", category: "decor" },
  { id: "g9", image: "./Assets/Decoration.jpg", title: "Soft Lighting Table Decor", category: "decor" },
  { id: "g10", image: "./Assets/img2.jpg", title: "Beautiful Arch Entrance", category: "decor" },
  { id: "g11", image: "./Assets/grooms.jpg", title: "Royal Navy Blue Groom Suit", category: "suits" },
  { id: "g12", image: "./Assets/dressing.jpeg", title: "Embroidered Gold Bridal Lace", category: "dresses" },
  { id: "g13", image: "./Assets/car.jpg", title: "Classic Vintage Wedding Ride", category: "cars" }
];

const SEED_BLOGS = [
  {
    id: "b1",
    title: "Choosing Your Dream Wedding Dress",
    category: "Bridal Tips",
    snippet: "Discover how to find the perfect gown for your body shape, wedding theme, and budget with our expert advice.",
    content: "Selecting a wedding dress is one of the most emotional and memorable parts of wedding planning. To make it smooth, first define your overall wedding theme—is it a beach ceremony, a rustic barn wedding, or a formal black-tie affair? Second, research dress silhouettes (A-line, ballgown, mermaid, sheath) that highlight your favorite features. Most importantly, start shopping 6-9 months in advance to allow time for fittings and custom tailors. At Bridal Belle Boutique, we provide custom styling consultants for every bride who visits.",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1519741497674-611481863552",
    date: "June 10, 2026"
  },
  {
    id: "b2",
    title: "Romantic Outdoor Wedding Ceremony Tips",
    category: "Wedding Video",
    snippet: "Watch our walkthrough of a romantic outdoor forest wedding ceremony layout and pick elements for your wedding day.",
    content: "Outdoor weddings offer breathtaking backdrops, but they also bring challenges like weather shifts, outdoor acoustics, and lighting changes. Always have a backup plan (like a luxury tent or indoor hall). Ensure guests are comfortable by offering hydration stations, fans, or blankets. Check local permits for sound systems and layout restrictions. When styling outdoor decor, stick to stable structures and flowers that don't wilt quickly in hot sun. Check out our video walkthrough to see a gorgeous forest ceremony layout in action.",
    mediaType: "video",
    mediaUrl: "./Assets/1video.mp4",
    date: "May 24, 2026"
  },
  {
    id: "b3",
    title: "Elegant Table & Arch Decoration Ideas",
    category: "Decoration",
    snippet: "Create magical wedding environments with stunning floral designs, warm fairy lights, and gold table setups.",
    content: "The tables and backdrops set the vibe for the entire reception. This season, gold accents, ivory candles, and lush eucalyptus leaves are leading the design trends. Focus on heights—mix tall floral centerpieces with short, glowing tea lights to add dimension. Backdrops with circular arches decorated with white roses and pampas grass create beautiful framing for photos. Always verify that decorations don't block the visual line of guests trying to converse across tables.",
    mediaType: "image",
    mediaUrl: "./Assets/img2.jpg",
    date: "April 18, 2026"
  },
  {
    id: "b4",
    title: "Classic & Modern Wedding Car Guide",
    category: "Wedding Cars",
    snippet: "Arrive in style with vintage convertibles, clean modern limos, or premium luxury sports cars. Here is how to choose.",
    content: "Your wedding car is not just transport—it is a huge part of your grand entry and your exit photos. Vintage cars add romance and classic elegance, perfect for formal and garden themes. Modern luxury cars like Mercedes-Benz or Range Rover offer comfort, state-of-the-art climate control, and smooth rides. Coordinate rental times carefully so the car arrives 15-20 minutes before schedule, allowing buffer room for pictures before the ceremony starts.",
    mediaType: "video",
    mediaUrl: "./Assets/cars.mp4",
    date: "March 02, 2026"
  }
];

const SEED_BOOKINGS = [
  {
    id: "bk-1001",
    name: "Alice Munezero",
    email: "alice@gmail.com",
    phone: "+250 788 123 456",
    date: "2026-07-20",
    services: ["Bridal Dress Rental", "Bridal Makeup Service"],
    total: 800,
    requests: "Needs a long veil and gold-themed makeup trial.",
    status: "Confirmed"
  },
  {
    id: "bk-1002",
    name: "Eric Gisa",
    email: "eric@outlook.com",
    phone: "+250 791 222 333",
    date: "2026-08-05",
    services: ["Groom Suit Rental", "Luxury Wedding Cars", "Photography & Video"],
    total: 1900,
    requests: "Vintage black Rolls Royce preferred.",
    status: "Pending"
  }
];

const SEED_USERS = [
  {
    name: "Admin Boss",
    email: "admin@bridal.com",
    password: "admin",
    role: "admin",
    joinedDate: "2026-01-01"
  },
  {
    name: "Jean Claude",
    email: "jean@gmail.com",
    password: "jean",
    role: "customer",
    joinedDate: "2026-03-15"
  },
  {
    name: "Marie Gisele",
    email: "marie@gmail.com",
    password: "marie",
    role: "customer",
    joinedDate: "2026-05-22"
  }
];

const SEED_MESSAGES = [
  {
    id: "msg-1",
    name: "Clarisse Mutoni",
    email: "clarisse@yahoo.com",
    message: "Hello, do you provide customized alterations if the dress rental does not fit perfectly?",
    date: "2026-06-12 14:32"
  }
];

// INIT DB ON LOAD
(function initializeDatabase() {
  if (!localStorage.getItem("bbb_services")) {
    localStorage.setItem("bbb_services", JSON.stringify(SEED_SERVICES));
  }
  if (!localStorage.getItem("bbb_gallery")) {
    localStorage.setItem("bbb_gallery", JSON.stringify(SEED_GALLERY));
  }
  if (!localStorage.getItem("bbb_blogs")) {
    localStorage.setItem("bbb_blogs", JSON.stringify(SEED_BLOGS));
  }
  if (!localStorage.getItem("bbb_bookings")) {
    localStorage.setItem("bbb_bookings", JSON.stringify(SEED_BOOKINGS));
  }
  if (!localStorage.getItem("bbb_users")) {
    localStorage.setItem("bbb_users", JSON.stringify(SEED_USERS));
  }
  if (!localStorage.getItem("bbb_messages")) {
    localStorage.setItem("bbb_messages", JSON.stringify(SEED_MESSAGES));
  }
})();

// HELPER ACTIONS (GLOBAL ACCESS)
window.db = {
  // SERVICES CRUD
  getServices: () => JSON.parse(localStorage.getItem("bbb_services")),
  saveServices: (data) => localStorage.setItem("bbb_services", JSON.stringify(data)),
  addService: (service) => {
    const services = window.db.getServices();
    service.id = "s-" + Date.now();
    services.push(service);
    window.db.saveServices(services);
    return service;
  },
  updateService: (id, updatedService) => {
    const services = window.db.getServices();
    const index = services.findIndex(s => s.id === id);
    if (index !== -1) {
      services[index] = { ...services[index], ...updatedService };
      window.db.saveServices(services);
      return true;
    }
    return false;
  },
  deleteService: (id) => {
    const services = window.db.getServices();
    const filtered = services.filter(s => s.id !== id);
    window.db.saveServices(filtered);
    return true;
  },

  // GALLERY CRUD
  getGallery: () => JSON.parse(localStorage.getItem("bbb_gallery")),
  saveGallery: (data) => localStorage.setItem("bbb_gallery", JSON.stringify(data)),
  addGalleryItem: (item) => {
    const gallery = window.db.getGallery();
    item.id = "g-" + Date.now();
    gallery.push(item);
    window.db.saveGallery(gallery);
    return item;
  },
  deleteGalleryItem: (id) => {
    const gallery = window.db.getGallery();
    const filtered = gallery.filter(g => g.id !== id);
    window.db.saveGallery(filtered);
    return true;
  },

  // BLOGS CRUD
  getBlogs: () => JSON.parse(localStorage.getItem("bbb_blogs")),
  saveBlogs: (data) => localStorage.setItem("bbb_blogs", JSON.stringify(data)),
  addBlog: (blog) => {
    const blogs = window.db.getBlogs();
    blog.id = "b-" + Date.now();
    blog.date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    blogs.push(blog);
    window.db.saveBlogs(blogs);
    return blog;
  },
  updateBlog: (id, updatedBlog) => {
    const blogs = window.db.getBlogs();
    const index = blogs.findIndex(b => b.id === id);
    if (index !== -1) {
      blogs[index] = { ...blogs[index], ...updatedBlog };
      window.db.saveBlogs(blogs);
      return true;
    }
    return false;
  },
  deleteBlog: (id) => {
    const blogs = window.db.getBlogs();
    const filtered = blogs.filter(b => b.id !== id);
    window.db.saveBlogs(filtered);
    return true;
  },

  // BOOKINGS CRUD
  getBookings: () => JSON.parse(localStorage.getItem("bbb_bookings")),
  saveBookings: (data) => localStorage.setItem("bbb_bookings", JSON.stringify(data)),
  addBooking: (booking) => {
    const bookings = window.db.getBookings();
    booking.id = "bk-" + (Math.floor(Math.random() * 9000) + 1000);
    booking.status = booking.status || "Pending";
    bookings.push(booking);
    window.db.saveBookings(bookings);
    return booking;
  },
  updateBooking: (id, updatedBooking) => {
    const bookings = window.db.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updatedBooking };
      window.db.saveBookings(bookings);
      return true;
    }
    return false;
  },
  deleteBooking: (id) => {
    const bookings = window.db.getBookings();
    const filtered = bookings.filter(b => b.id !== id);
    window.db.saveBookings(filtered);
    return true;
  },

  // USERS CRUD & AUTH
  getUsers: () => JSON.parse(localStorage.getItem("bbb_users")),
  saveUsers: (data) => localStorage.setItem("bbb_users", JSON.stringify(data)),
  registerUser: (name, email, password, phone = "") => {
    const users = window.db.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, message: "Email is already registered!" };
    }
    const newUser = {
      name,
      email,
      password,
      phone,
      role: "customer",
      joinedDate: new Date().toISOString().split("T")[0]
    };
    users.push(newUser);
    window.db.saveUsers(users);
    return { success: true, user: newUser };
  },
  loginUser: (email, password) => {
    const users = window.db.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      sessionStorage.setItem("bbb_session", JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, message: "Invalid email or password!" };
  },
  getCurrentUser: () => JSON.parse(sessionStorage.getItem("bbb_session")),
  logoutUser: () => {
    sessionStorage.removeItem("bbb_session");
  },
  deleteUser: (email) => {
    const users = window.db.getUsers();
    const filtered = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    window.db.saveUsers(filtered);
    return true;
  },

  // MESSAGES INBOX
  getMessages: () => JSON.parse(localStorage.getItem("bbb_messages")),
  saveMessages: (data) => localStorage.setItem("bbb_messages", JSON.stringify(data)),
  addMessage: (name, email, message) => {
    const messages = window.db.getMessages();
    const newMsg = {
      id: "msg-" + Date.now(),
      name,
      email,
      message,
      date: new Date().toISOString().replace("T", " ").substring(0, 16)
    };
    messages.push(newMsg);
    window.db.saveMessages(messages);
    return newMsg;
  },
  deleteMessage: (id) => {
    const messages = window.db.getMessages();
    const filtered = messages.filter(m => m.id !== id);
    window.db.saveMessages(filtered);
    return true;
  }
};
