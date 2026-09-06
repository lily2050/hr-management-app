import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button, ProgressBar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.welcomeText}>
            أهلاً وسهلاً بك، {user?.fullName}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="bodySmall" style={styles.statLabel}>
              إجمالي الموظفين
            </Text>
            <Text variant="headlineMedium" style={styles.statValue}>
              50
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="bodySmall" style={styles.statLabel}>
              الحاضرون اليوم
            </Text>
            <Text variant="headlineMedium" style={styles.statValue}>
              45
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="bodySmall" style={styles.statLabel}>
              الغائبون اليوم
            </Text>
            <Text variant="headlineMedium" style={styles.statValue}>
              3
            </Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <Text variant="bodySmall" style={styles.statLabel}>
              على إجازة
            </Text>
            <Text variant="headlineMedium" style={styles.statValue}>
              2
            </Text>
          </Card.Content>
        </Card>
      </View>

      <Card style={styles.requestCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.requestTitle}>
            طلبات قيد المراجعة
          </Text>
          <View style={styles.requestItem}>
            <Text variant="bodyMedium">طلبات إجازات: 5</Text>
          </View>
          <View style={styles.requestItem}>
            <Text variant="bodyMedium">طلبات أذونات: 3</Text>
          </View>
          <View style={styles.requestItem}>
            <Text variant="bodyMedium">مأموريات: 2</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  welcomeCard: {
    marginBottom: 16,
    backgroundColor: '#2196F3',
  },
  welcomeText: {
    color: 'white',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  statLabel: {
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    color: '#2196F3',
    textAlign: 'center',
  },
  requestCard: {
    marginBottom: 16,
  },
  requestTitle: {
    marginBottom: 12,
    fontWeight: 'bold',
  },
  requestItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default HomeScreen;
