// src/components/ui/CustomCursor.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Map, Utensils, Store, BookOpen, Users, X } from 'lucide-react';

/**
 * 判断一个元素是否属于可交互元素（点击后不应弹出导航栏）
 * - 标准表单控件
 * - 按钮、链接
 * - 带有特定属性或类名的元素
 */
const isInteractiveElement = (element) => {
  if (!element) return false;

  // 1. 检查标签名
  const tagName = element.tagName;
  if (['INPUT', 'SELECT', 'TEXTAREA', 'BUTTON', 'A'].includes(tagName)) {
    return true;
  }

  // 2. 检查 role 属性
  const role = element.getAttribute('role');
  if (role === 'button' || role === 'link') return true;

  // 3. 检查是否有 cursor-pointer 类名（你的地图容器就用了这个）
  if (element.classList.contains('cursor-pointer')) return true;

  // 4. 检查 computed style 是否为 pointer（作为兜底）
  if (window.getComputedStyle(element).cursor === 'pointer') return true;

  // 5. 向上查找父元素（closest 已包含此逻辑，但单独调用时也会用）
  return false;
};

export default function CustomCursor({ activeTab, setActiveTab }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navStyle, setNavStyle] = useState({
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, 20px)',
  });

  // 导航菜单项（排除当前页）
  const NAV_ITEMS = [
    { id: 'shops', label: '店家資訊', icon: Store },
    { id: 'menu', label: '餐點圖鑑', icon: Utensils },
    { id: 'map', label: '步行地圖', icon: Map },
    { id: 'info', label: '素食小百科', icon: BookOpen },
    { id: 'about', label: '關於我們', icon: Users },
  ];

  const filteredNavItems = NAV_ITEMS.filter((item) => item.id !== activeTab);

  // ----- 鼠标移动：更新位置 & 检测悬停 -----
  const handleMouseMove = useCallback((e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);

    // 检测悬停元素是否为可交互元素
    const target = e.target;
    const interactive =
      isInteractiveElement(target) || !!target.closest('button, a, [role="button"], .cursor-pointer');

    setIsHovering(interactive);
  }, [isVisible]);

  // ----- 全局点击：决定是否弹出导航栏 -----
  const handleGlobalClick = useCallback(
    (e) => {
      const target = e.target;

      // 如果点击的是导航栏自身或其中的按钮，不做任何处理（避免关闭自己）
      if (target.closest('.floating-mini-nav')) return;

      // 判断点击的元素是否可交互（例如输入框、按钮等）
      const interactive =
        isInteractiveElement(target) || !!target.closest('button, a, [role="button"], .cursor-pointer');

      if (!interactive) {
        // 只有点击“空白”区域（非交互元素）才弹出导航栏
        let x = e.clientX;
        let y = e.clientY;
        let xTransform = '-50%';
        let yTransform = '20px';

        const safeMargin = 300;

        // 边界检测，防止导航栏被切掉
        if (x < safeMargin) {
          xTransform = '0%';
          x += 15;
        } else if (x > window.innerWidth - safeMargin) {
          xTransform = '-100%';
          x -= 15;
        }

        if (y > window.innerHeight - 80) {
          yTransform = 'calc(-100% - 20px)';
        }

        setNavStyle({
          left: `${x}px`,
          top: `${y}px`,
          transform: `translate(${xTransform}, ${yTransform})`,
        });

        setIsNavOpen((prev) => !prev);
      } else {
        // 如果点击的是可交互元素，则关闭导航栏（如果已打开）
        if (isNavOpen) setIsNavOpen(false);
      }
    },
    [isNavOpen]
  );

  // 鼠标离开窗口
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  // ----- 注册事件监听 -----
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, handleGlobalClick]);

  return (
    <>
      {/* 浮动导航栏 */}
      <div
        className={`floating-mini-nav fixed z-[9998] transition duration-300 ease-out flex flex-wrap items-center justify-center p-1.5 bg-[#FDFCF8]/95 backdrop-blur-xl border border-stone-200 rounded-2xl md:rounded-full shadow-2xl w-max max-w-[90vw] origin-center ${
          isNavOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={navStyle}
      >
        {filteredNavItems.map((item, idx) => (
          <React.Fragment key={item.id}>
            <button
              onClick={() => {
                setActiveTab(item.id);
                setIsNavOpen(false);
              }}
              className="flex items-center px-3 py-2 md:px-4 md:py-2 hover:bg-stone-200 rounded-full transition-colors group cursor-pointer"
            >
              <item.icon
                size={14}
                className="mr-1.5 text-stone-500 group-hover:text-green-600 transition-colors"
              />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A] whitespace-nowrap">
                {item.label}
              </span>
            </button>
            {idx < filteredNavItems.length - 1 && (
              <div className="hidden md:block w-[1px] h-4 bg-stone-300 mx-1"></div>
            )}
          </React.Fragment>
        ))}
        <div className="w-[1px] h-4 bg-stone-300 mx-1"></div>
        <button
          onClick={() => setIsNavOpen(false)}
          className="p-2 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
        >
          <X size={14} className="text-stone-500" />
        </button>
      </div>

      {/* 自定义光标 */}
      {isVisible && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        >
          {isHovering ? (
            <div className="relative -translate-x-1/2 -translate-y-1/2 transition-all duration-300">
              <div className="w-4 h-4 bg-green-600 rounded-full shadow-[0_0_15px_rgba(22,163,74,0.5)] scale-150 transition-transform"></div>
            </div>
          ) : (
            <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 opacity-70">
              <div className="w-10 h-10 border border-green-700/50 rounded-full animate-[spin_4s_linear_infinite] flex items-center justify-center"></div>
              <Plus size={16} className="absolute text-green-700/70" />
            </div>
          )}
        </div>
      )}
    </>
  );
}