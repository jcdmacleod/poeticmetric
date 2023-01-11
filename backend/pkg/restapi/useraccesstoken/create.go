package useraccesstoken

import (
	"github.com/gofiber/fiber/v2"
	"github.com/poeticmetric/poeticmetric/backend/pkg/restapi/middleware/authentication"
	dm "github.com/poeticmetric/poeticmetric/backend/pkg/restapi/middleware/depot"
	"github.com/poeticmetric/poeticmetric/backend/pkg/service/useraccesstoken"
)

func create(c *fiber.Ctx) error {
	userAccessToken, err := useraccesstoken.Create(dm.Get(c), authentication.Get(c).User.Id)
	if err != nil {
		return err
	}

	return c.JSON(userAccessToken)
}
