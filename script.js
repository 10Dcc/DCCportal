// Add this to your script.js or in a script tag
document.getElementById('studentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const qualification = document.getElementById('studentQualification').value;
  const courseList = document.getElementById('courseList');
  const eligibleCourses = document.getElementById('eligibleCourses');
  
  // Clear previous results
  courseList.innerHTML = '';
  
  // Define courses based on qualification
  let courses = [];
  if (qualification === '10th/12th') {
    courses = [
      { name: 'Certificate in Computer Applications (CCA)', duration: '3 Months' },
      { name: 'Diploma in Computer Applications (DCA)', duration: '6 Months' },
      { name: 'Diploma in IT & Automation (DIA)', duration: '6 Months' }
    ];
  } else if (qualification === 'graduate') {
    courses = [
      { name: 'Post Graduate Diploma in Computer Science and Applications (PGDCSA)', duration: '12 Months' },
      { name: 'Advanced Diploma in Computer Applications (ADCA)', duration: '12 Months' }
    ];
  } else {
    courses = [
      { name: 'Certificate in Computer Applications (CCA)', duration: '3 Months' },
      { name: 'Tally with GST', duration: '3 Months' }
    ];
  }
  
  // Display courses
  courses.forEach(course => {
    const courseHtml = `
      <div class="col-md-6">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${course.name}</h5>
            <p class="card-text"><small>Duration: ${course.duration}</small></p>
          </div>
        </div>
      </div>
    `;
    courseList.insertAdjacentHTML('beforeend', courseHtml);
  });
  
  eligibleCourses.classList.remove('d-none');
});

// Smooth Scrolling for Navigation
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate offset based on navbar height
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without page jump
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });
  
  // Lazy load images
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

// Form Submission Handling
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    try {
      // Show loading state
      submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
      submitButton.disabled = true;
      
      // Simulate form submission (replace with actual fetch/axios call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-success mt-3';
      alertDiv.textContent = 'Thank you! Your message has been sent successfully.';
      this.appendChild(alertDiv);
      
      // Reset form
      this.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-danger mt-3';
      alertDiv.textContent = 'There was an error submitting your form. Please try again.';
      this.appendChild(alertDiv);
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
      
      // Remove alert after 5 seconds
      setTimeout(() => {
        const alert = this.querySelector('.alert');
        if (alert) alert.remove();
      }, 5000);
    }
  });
});
// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = document.getElementById('submitText');
  const submitSpinner = document.getElementById('submitSpinner');
  const responseDiv = document.getElementById('formResponse');
  
  // Show loading state
  submitText.textContent = 'Sending...';
  submitSpinner.classList.remove('d-none');
  submitBtn.disabled = true;
  responseDiv.innerHTML = '';
  
  try {
    const formData = new FormData(form);
    
    const response = await fetch('save_to_excel.php', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.status === 'success') {
      responseDiv.innerHTML = `
        <div class="alert alert-success">${result.message}</div>
      `;
      form.reset();
    } else {
      responseDiv.innerHTML = `
        <div class="alert alert-danger">${result.message}</div>
      `;
    }
  } catch (error) {
    console.error('Error:', error);
    responseDiv.innerHTML = `
      <div class="alert alert-danger">There was an error submitting your form. Please try again.</div>
    `;
  } finally {
    // Reset button state
    submitText.textContent = 'Send Message';
    submitSpinner.classList.add('d-none');
    submitBtn.disabled = false;
  }
});
