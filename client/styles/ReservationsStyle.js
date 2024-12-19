import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    parent: 
    {
      flex: 1,
      backgroundColor: '#f4f7fa',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingTop: 20,
    },

    filterContainer: 
    {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 15,
      paddingHorizontal: 20,
      paddingVertical: 10,
      width: '100%'
    },

    filterButton: 
    {
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginHorizontal: 5,
      backgroundColor: 'rgba(0, 0, 0, .1)',
      borderRadius: 10,
      width: '50%'

    },

    activeFilterButton: 
    {
      backgroundColor: '#3498db',
    },

    filterButtonText: 
    {
      color: '#2ecc71',
      fontWeight: '600',
      letterSpacing: 1,
      textAlign: 'center'
    },

    activeFilterButtonText: 
    {
      color: 'white',
    },

    sectionTitleText: 
    {
      fontSize: 18,
      fontWeight: 400,
      color: '#2c3e50',
      marginVertical: 5,
      paddingHorizontal: 20,
      letterSpacing: 1
    },
    
    horizontalScroll: 
    {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 20,
      height: 150,
    },

    restaurantCard: 
    {
      width: 150,
      height: '100%',
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginRight: 10,
      paddingRight: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },

    restaurantCardOverlay: 
    {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },

    restaurantName: 
    {
      fontSize: 16,
      fontWeight: '600',
      color: '#2c3e50',
      textAlign: 'center',
    },

    restaurantCuisine: 
    {
      fontSize: 12,
      color: '#7f8c8d',
      marginTop: 5,
    },

    reservationsListParent: 
    {
      justifyContent: 'flex-start',
      height: '55%'
    },

    reservationsList: 
    {
      paddingHorizontal: 20,
      justifyContent: 'flex-start',
      paddingVertical: 25,
    },

    reservationCard: 
    {
      backgroundColor: '#ffffff',
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 1,
    },

    inactiveReservation: 
    {
      opacity: 0.5,
    },

    reservationContentContainer: 
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },

    reservationTextContainer: 
    {
      flex: 1,
    },

    reservationText: {
      fontSize: 16,
      color: '#2c3e50',
      flex: 1,
    },

    reservationDetailsText: 
    {
      fontSize: 12,
      color: '#7f8c8d',
      marginTop: 5,
    },

    activeStatusBadge: 
    {
      backgroundColor: '#2ecc71',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
    },

    activeStatusText: 
    {
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
    },

    noReservationsText: 
    {
      fontSize: 16,
      color: '#7f8c8d',
      textAlign: 'center',
      marginTop: 10,
    },

    swipeActionContainer: 
    {
      width: 80,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    deleteButton: 
    {
      backgroundColor: '#e74c3c',
      width: 60,
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    //   borderRadius: 10,
      marginVertical: 5,
    },

    // MODAL
    modalContainer:
    {
        flex: 1,
        backgroundColor: '#F2F2F7',
    },

    modalHeader: 
    {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },

    modalBackButton: 
    {
        marginRight: 15,
    },

    modalHeaderTitle: 
    {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
    },

    modalContent: 
    {
      paddingBottom: 20,
    },

    detailSection: 
    {
        backgroundColor: 'white',
        marginHorizontal: 15,
        marginTop: 15,
        borderRadius: 10,
        padding: 15,
    },

    sectionTitle: 
    {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },

    detailRow: 
    {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },

    detailLabel: 
    {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#666',
    },

    detailValue: 
    {
        flex: 2,
        fontSize: 14,
        color: '#333',
        textAlign: 'right',
    },

    updateButton:
    {
      width: '92%',
      alignSelf: 'center',
      marginTop: 10,
      padding: 15,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 15,
      backgroundColor: '#3498db',
    },
  
    updateButtonText:
    {
      textAlign: 'center',
      textTransform: 'uppercase',
      fontSize: 16,
      color: '#333',
      fontWeight: 900,
      letterSpacing: 1
    }
  });