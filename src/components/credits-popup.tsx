"use client";

import { XIcon } from "lucide-react";
import { forwardRef, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Credits } from "./credits";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./drawer";
import { useIsMobile } from "~/hooks/is-mobile";

export function CreditsPopup() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const portalRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile(768);

  if(isMobile) {
    return(
      <DrawerPopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        credits={<Credits/>}
      />
    )
  }

  return (
    <>
      <TriggerButton onClick={() => setIsOpen(true)}/>
      {isOpen && 
        createPortal(
          <div
            ref={portalRef}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              minWidth: "100%",
              zIndex: 999,
            }}
          >
            <Popup closeFunc={() => setIsOpen(false)} credits={<Credits/>}/>
          </div>,
          document.body,
        )
      }    
    </>
  );
}

type Props = {
  onClick?: () => void
}
const TriggerButton = forwardRef<HTMLButtonElement, Props>(({onClick, ...props}, ref) => {
  return (
    <button
      className="text-blue-300/50 hover:text-blue-300 transition-all"
      onClick={onClick}
      ref={ref}
      {...props}
    >
      Credits
    </button>
  );
})
TriggerButton.displayName = "TriggerButton";

function Popup({closeFunc, credits}: {closeFunc: () => void, credits: React.ReactNode}) {
  const popupRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Node;
      if (!target || !popupRef.current) return;
      if (!popupRef.current.contains(target)) {
        closeFunc();
      }
    },
    [popupRef]
  );
  const onEscPress = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeFunc();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("keydown", onEscPress);
    return () => {
      window.removeEventListener("keydown", onEscPress);
    };
  }, []);

  return(
    <div className="min-w-screen min-h-screen bg-zinc-950/40 flex flex-col justify-center items-center px-8">
      <div className="w-full flex items-start gap-3 max-w-[500px] bg-[#083080] rounded-2xl text-zinc-100 p-6" ref={popupRef}>
        {credits}
        <div>
          <button 
            className="self-end rounded-sm bg-transparent hover:bg-blue-300/30 transition-all p-px h-min"
            onClick={closeFunc}  
            >
            <XIcon className="size-4 stroke-zinc-100"/>
          </button>
        </div>
      </div>
    </div>
  )
}

function DrawerPopup({credits, isOpen, setIsOpen}: {credits: React.ReactNode, isOpen: boolean, setIsOpen: (value: SetStateAction<boolean>) => void}) {
  return(
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <TriggerButton/>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="hidden">Credits</DrawerTitle>
          <DrawerDescription className="hidden">Credits for app</DrawerDescription>
          {credits}
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose className="group">
            <span className="text-blue-300/50 group-hover:text-blue-300 transition-all">
              Close
            </span>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}