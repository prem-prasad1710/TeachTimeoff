def detect_urgency(reason):
    reason = reason.lower()

    high_keywords = ['urgent', 'emergency', 'hospital', 'sick', 'death', 'medical', 'accident', 'immediate']
    medium_keywords = ['family function', 'personal work', 'appointment', 'festival']
    low_keywords = ['vacation', 'trip', 'holiday', 'outing']

    if any(word in reason for word in high_keywords):
        return "High Urgency"
    elif any(word in reason for word in medium_keywords):
        return "Medium Urgency"
    elif any(word in reason for word in low_keywords):
        return "Low Urgency"
    else:
        return "Normal"
    

if __name__ == '__main__':
    # Example usage when running this module directly
    print(detect_urgency("My father is hos, I need leave."))


