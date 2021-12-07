from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class UserTokenSerializer(TokenObtainPairSerializer):

    def update(self, instance, validated_data):
        super(UserTokenSerializer, self).update(instance, validated_data)

    def create(self, validated_data):
        super(UserTokenSerializer, self).create(validated_data)

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)
        data.update(
            refresh=dict(
                token=str(refresh),
                exp=refresh.payload.get('exp')
            )
        )

        access_token = refresh.access_token
        data.update(
            access=dict(
                token=str(access_token),
                exp=access_token.payload.get('exp')
            )
        )

        user_permissions = self.user.user_permissions.all()

        data.update(dict(
            user=dict(
                username=self.user.username,
                first_name=self.user.first_name,
                last_name=self.user.last_name,
                email=self.user.email,
                permissions=[perm.codename for perm in user_permissions] if len(user_permissions) > 0 else ['__all__']
            ),
        ))

        return data


class UserTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenSerializer
