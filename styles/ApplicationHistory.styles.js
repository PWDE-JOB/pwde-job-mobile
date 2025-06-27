import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6cbba6',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#6cbba6',
    padding: 16,
    borderRadius: 12,
    marginTop: 35,
  },
  backButton: {
    marginRight: 16,
    backgroundColor: '#e2eeec',
    padding: 8,
    borderRadius: 8,
  },
  backText: {
    fontSize: 16,
    color: '#21332a',
    fontWeight: '600',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#21332a',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#e2eeec',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#21332a',
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    color: '#21332a',
    marginBottom: 12,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '600',
  },
  statusAccepted: {
    backgroundColor: '#96c0b3',
    color: '#025306',
  },
  statusUnderReview: {
    backgroundColor: '#acd5d0',
    color: '#21332a',
  },
  statusRejected: {
    backgroundColor: '#ffcdd2',
    color: '#c62828',
  },
  applicationDetails: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#4a6b60',
    fontWeight: '600',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#21332a',
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    marginBottom: 12,
    gap: 8,
  },
  skillTag: {
    backgroundColor: '#96c0b3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  skillText: {
    color: '#21332a',
    fontSize: 12,
    fontWeight: '500',
  },
  applicationDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'right',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#c62828',
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#ffcdd2',
    padding: 12,
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: '50%',
  },
  emptyText: {
    color: '#21332a',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: '#e2eeec',
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
});

export default styles;
