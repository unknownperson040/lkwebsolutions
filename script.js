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

// Initialize EmailJS
emailjs.init("yo7-HMUsMeyBLQv-n");  // Replace with your EmailJS public key

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

  // EmailJS send function
  console.log("Attempting to send email...");
  emailjs.send("lkwebsolutions", "template_Lkwebsolutions", {
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
});  // Missing closing }); added here