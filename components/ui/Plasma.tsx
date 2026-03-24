"use client";

import React, { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: "forward" | "reverse" | "pingpong";
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [1, 0.5, 0.2];
  return [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
out vec4 fragColor;

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  C = (C - center) / uScale + center;
  
  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);
  
  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < 48.; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y)); 
    p.z -= 4.; 
    S = p;
    d = p.y-T;
    
    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05); 
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T)); 
    z+= d = abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4; 
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
  }
  
  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);
  
  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));
  
  float alpha = length(rgb) * uOpacity;
  fragColor = vec4(finalColor, alpha);
}`;

type ProgramUniformValue = {
  value: number | Float32Array;
};

type PlasmaUniforms = {
  iTime: ProgramUniformValue;
  iResolution: ProgramUniformValue;
  uCustomColor: ProgramUniformValue;
  uUseCustomColor: ProgramUniformValue;
  uSpeed: ProgramUniformValue;
  uDirection: ProgramUniformValue;
  uScale: ProgramUniformValue;
  uOpacity: ProgramUniformValue;
  uMouse: ProgramUniformValue;
  uMouseInteractive: ProgramUniformValue;
};

export const Plasma: React.FC<PlasmaProps> = ({
  color = "#ffffff",
  speed = 1,
  direction = "forward",
  scale = 1,
  opacity = 1,
  mouseInteractive = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const effectiveMouseInteractive = mouseInteractive && !prefersReducedMotion && !isCoarsePointer;
    const maxDpr = prefersReducedMotion || isCoarsePointer ? 1 : 1.5;

    const useCustomColor = color ? 1.0 : 0.0;
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];
    const directionMultiplier = direction === "reverse" ? -1.0 : 1.0;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, maxDpr),
        powerPreference: "high-performance"
      });
    } catch {
      renderer = new Renderer({
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, maxDpr),
        powerPreference: "high-performance"
      });
    }

    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(customColorRgb) },
        uUseCustomColor: { value: useCustomColor },
        uSpeed: { value: speed * 0.4 },
        uDirection: { value: directionMultiplier },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: effectiveMouseInteractive ? 1.0 : 0.0 }
      }
    });

    const uniforms = program.uniforms as unknown as PlasmaUniforms;
    const mesh = new Mesh(gl, { geometry, program });

    const handlePointerMove = (event: PointerEvent) => {
      if (!effectiveMouseInteractive) return;
      const rect = container.getBoundingClientRect();
      mousePos.current.x = event.clientX - rect.left;
      mousePos.current.y = event.clientY - rect.top;

      const mouseUniform = uniforms.uMouse.value as Float32Array;
      mouseUniform[0] = mousePos.current.x;
      mouseUniform[1] = mousePos.current.y;
    };

    if (effectiveMouseInteractive) {
      container.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      renderer.setSize(width, height);
      const resolution = uniforms.iResolution.value as Float32Array;
      resolution[0] = gl.drawingBufferWidth;
      resolution[1] = gl.drawingBufferHeight;
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    setSize();

    let raf = 0;
    let isInView = true;
    let isPageVisible = !document.hidden;
    const t0 = performance.now();

    const loop = (time: number) => {
      if (!isInView || !isPageVisible) {
        raf = 0;
        return;
      }

      const elapsedSeconds = (time - t0) * 0.001;

      if (direction === "pingpong") {
        const pingpongDuration = 10;
        const segmentTime = elapsedSeconds % pingpongDuration;
        const isForward = Math.floor(elapsedSeconds / pingpongDuration) % 2 === 0;
        const u = segmentTime / pingpongDuration;
        const smooth = u * u * (3 - 2 * u);
        const pingpongTime = isForward ? smooth * pingpongDuration : (1 - smooth) * pingpongDuration;
        uniforms.uDirection.value = 1.0;
        uniforms.iTime.value = pingpongTime;
      } else {
        uniforms.iTime.value = elapsedSeconds;
      }

      renderer.render({ scene: mesh });
      raf = window.requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (raf === 0 && isInView && isPageVisible) {
        raf = window.requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (raf !== 0) {
        window.cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.01 }
    );

    intersectionObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (effectiveMouseInteractive) {
        container.removeEventListener("pointermove", handlePointerMove);
      }
      try {
        container.removeChild(canvas);
      } catch {
        // No-op in cleanup race conditions.
      }
    };
  }, [color, speed, direction, scale, opacity, mouseInteractive]);

  return <div ref={containerRef} className="relative h-full w-full overflow-hidden" />;
};

export default Plasma;
