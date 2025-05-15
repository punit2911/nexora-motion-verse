
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 30;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    
    // Create positions and colors for each particle
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Positions - distribute in a sphere
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 100;
      
      // Colors - use nexora colors
      if (i % 9 === 0) {
        // Purple
        colorsArray[i] = 110/255;
        colorsArray[i + 1] = 89/255;
        colorsArray[i + 2] = 165/255;
      } else if (i % 9 === 3) {
        // Blue
        colorsArray[i] = 51/255;
        colorsArray[i + 1] = 195/255;
        colorsArray[i + 2] = 240/255;
      } else {
        // Orange
        colorsArray[i] = 249/255;
        colorsArray[i + 1] = 115/255;
        colorsArray[i + 2] = 22/255;
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);
    
    // Add a few larger blobs in Nexora colors
    const blobGeometry = new THREE.SphereGeometry(2, 32, 32);
    
    const createBlob = (color: number, position: [number, number, number]) => {
      const blobMaterial = new THREE.MeshPhongMaterial({ 
        color,
        transparent: true,
        opacity: 0.2
      });
      const blob = new THREE.Mesh(blobGeometry, blobMaterial);
      blob.position.set(...position);
      return blob;
    };
    
    // Add blobs with Nexora colors
    const blob1 = createBlob(0x6E59A5, [-15, 10, -10]); // Purple
    const blob2 = createBlob(0x33C3F0, [15, -10, -15]); // Blue
    const blob3 = createBlob(0xF97316, [0, 15, -20]); // Orange
    
    scene.add(blob1, blob2, blob3);

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };
    
    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Smooth mouse following
      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;
      
      // Rotate particle system
      particleSystem.rotation.y += 0.005;
      particleSystem.rotation.x += 0.002;
      
      // Make camera follow mouse with lag
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Animate blobs
      blob1.position.y = 10 + Math.sin(elapsedTime * 0.5) * 2;
      blob2.position.y = -10 + Math.cos(elapsedTime * 0.7) * 2;
      blob3.position.x = Math.sin(elapsedTime * 0.3) * 5;
      
      // Pulsate blobs
      const scale1 = 1 + Math.sin(elapsedTime) * 0.2;
      const scale2 = 1 + Math.sin(elapsedTime + 2) * 0.2;
      const scale3 = 1 + Math.sin(elapsedTime + 4) * 0.2;
      
      blob1.scale.set(scale1, scale1, scale1);
      blob2.scale.set(scale2, scale2, scale2);
      blob3.scale.set(scale3, scale3, scale3);
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    />
  );
};

export default AnimatedBackground;
