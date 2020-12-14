import React, { useState } from 'react'

export const useDialog = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    return {
        isOpen,
        onToggleDialog: handleToggleDialog
    }
}