// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Sticky Navigation Shrink Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});

// Section Fade-In on Scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(section => {
  observer.observe(section);
});

// Initialize EmailJS with environment variables
emailjs.init(process.env.EMAILJS_PUBLIC_KEY);  // Public key environment variable

// Form Submission with EmailJS
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const responseEl = document.getElementById('response');  // Ensure this matches your HTML

  // Basic validation
  if (!name || !email || !message) {
    responseEl.textContent = "All fields are required!";
    responseEl.style.color = "red";
    responseEl.style.display = "block";
    return;
  }

  // EmailJS send function using environment variables for sensitive data
  console.log("Attempting to send email...");
  emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID, {
    name: name,
    email: email,
    message: message,
  })
  .then(() => {
    console.log("Email sent successfully");
    responseEl.textContent = "Message sent successfully!";
    responseEl.style.color = "#8cd790";
    responseEl.style.display = "block";
    document.getElementById('contact-form').reset();
  }, (error) => {
    console.error("Failed to send email:", error);
    responseEl.textContent = "Failed to send message. Please try again later.";
    responseEl.style.color = "red";
    responseEl.style.display = "block";
  });
});
