import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row',
        backgroundColor: '#1F1E25',
        height: 80,
        width: '100%',  
        alignItems: 'center',          
        paddingTop: 40
    }, 
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 80,        
        color: 'white',
    }, 
    button: {
        marginLeft: 10,
        padding: 10,
    },
    icon: {
        color: 'white',
        fontSize: 30,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        margin: 20,
    },
    modalButton: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalText: {
        fontSize: 18,
        textAlign: 'center',
    },    
});